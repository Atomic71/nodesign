import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export interface ImageInfo {
  src: string;
  thumbnail: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectInfo {
  name: string;
  slug: string;
  description?: string;
  coverImage: string;
  images: ImageInfo[];
}

export interface CategoryInfo {
  name: string;
  slug: string;
  description?: string;
  projects: ProjectInfo[];
}

const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 300;

async function generateThumbnail(
  imagePath: string,
  thumbnailPath: string
): Promise<void> {
  await sharp(imagePath)
    .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
      fit: 'cover',
      position: 'attention',
    })
    .toFile(thumbnailPath);
}

async function processImage(
  publicPath: string,
  relativePath: string
): Promise<ImageInfo> {
  const fullPath = path.join(process.cwd(), 'public', publicPath);
  const extension = path.extname(relativePath);
  const basename = path.basename(relativePath, extension);
  const thumbnailRelativePath = `thumbnails/${relativePath}`;
  const thumbnailPath = path.join(
    process.cwd(),
    'public',
    thumbnailRelativePath
  );

  await fs.mkdir(path.dirname(thumbnailPath), { recursive: true });

  try {
    const [imageStats, thumbnailStats] = await Promise.all([
      fs.stat(fullPath),
      fs.stat(thumbnailPath).catch(() => null),
    ]);

    if (!thumbnailStats || thumbnailStats.mtime < imageStats.mtime) {
      await generateThumbnail(fullPath, thumbnailPath);
    }
  } catch (error) {
    console.error(`Error processing thumbnail for ${relativePath}:`, error);
    // Use original image as thumbnail if processing fails
    await fs.copyFile(fullPath, thumbnailPath);
  }

  // Get image dimensions
  let width = 0,
    height = 0;
  try {
    const metadata = await sharp(fullPath).metadata();
    width = metadata.width || 0;
    height = metadata.height || 0;
  } catch (error) {
    console.error(`Error getting metadata for ${relativePath}:`, error);
  }

  return {
    src: `/${publicPath}`,
    thumbnail: `/${thumbnailRelativePath}`,
    alt: basename.replace(/-/g, ' '),
    width,
    height,
  };
}
async function processProject(
  categorySlug: string,
  projectDir: string
): Promise<ProjectInfo | null> {
  const projectPath = path.join(
    process.cwd(),
    'public',
    'gallery',
    categorySlug,
    projectDir
  );
  const stats = await fs.stat(projectPath);

  if (!stats.isDirectory()) return null;

  const files = await fs.readdir(projectPath);
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  const imagePromises = imageFiles.map(async (image) => {
    const imagePath = `gallery/${categorySlug}/${projectDir}/${image}`;
    return processImage(imagePath, `${categorySlug}/${projectDir}/${image}`);
  });

  const images = await Promise.all(imagePromises);

  let description: string | undefined;
  try {
    const descriptionPath = path.join(projectPath, 'description.txt');
    description = await fs.readFile(descriptionPath, 'utf-8');
  } catch {
    // If no description file exists, that's okay
  }

  return {
    name: projectDir.replace(/-/g, ' '),
    slug: projectDir,
    description,
    coverImage: images[0]?.thumbnail || '',
    images,
  };
}

export async function getCategories(): Promise<CategoryInfo[]> {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');

  console.log('Scanning gallery directory:', galleryDir);

  try {
    const categories = await fs.readdir(galleryDir);
    console.log('Found categories:', categories);

    const categoryPromises = categories
      .filter((dir) => dir !== '.DS_Store') // Ignore .DS_Store
      .map(async (categoryDir) => {
        const categoryPath = path.join(galleryDir, categoryDir);
        console.log('Processing category:', categoryDir);

        const stats = await fs.stat(categoryPath);

        if (!stats.isDirectory()) {
          console.log(`Skipping ${categoryDir} as it's not a directory`);
          return null;
        }

        const projectDirs = await fs.readdir(categoryPath);
        console.log(
          `Found ${projectDirs.length} projects in ${categoryDir}:`,
          projectDirs
        );

        const projectPromises = projectDirs.map((projectDir) =>
          processProject(categoryDir, projectDir).catch((error) => {
            console.error(
              `Error processing project ${projectDir} in ${categoryDir}:`,
              error
            );
            return null;
          })
        );

        const projects = (await Promise.all(projectPromises)).filter(
          Boolean
        ) as ProjectInfo[];

        if (projects.length === 0) {
          console.log(`No valid projects found in category ${categoryDir}`);
          return null;
        }

        let description: string | undefined;
        try {
          const descriptionPath = path.join(categoryPath, 'description.txt');
          description = await fs.readFile(descriptionPath, 'utf-8');
        } catch {
          console.log(`No description file found for ${categoryDir}`);
        }

        return {
          name: categoryDir.replace(/-/g, ' '),
          slug: categoryDir,
          description,
          projects,
        };
      });

    const processedCategories = await Promise.all(categoryPromises);
    const validCategories = processedCategories.filter(
      Boolean
    ) as CategoryInfo[];

    console.log(
      `Found ${validCategories.length} valid categories:`,
      JSON.stringify(validCategories, null, 2)
    );

    return validCategories;
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return [];
  }
}

export function getCategoryMap(): Promise<Map<string, CategoryInfo>> {
  return getCategories().then(
    (categories) =>
      new Map(categories.map((category) => [category.slug, category]))
  );
}
