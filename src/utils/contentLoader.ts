import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

interface ContentData {
  frontmatter: { [key: string]: any };
  content: string;
}

export async function getContent(slug: string): Promise<ContentData | null> {
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return { frontmatter: data, content };
  } catch (error) {
    console.error(`Error loading content for ${slug}:`, error);
    return null;
  }
}

export async function getAllContent(): Promise<
  (ContentData & { slug: string })[]
> {
  const contentDir = path.join(process.cwd(), 'content');
  const files = await fs.readdir(contentDir);

  const contentPromises = files.map(async (file) => {
    const slug = path.basename(file, '.md');
    const content = await getContent(slug);
    return content ? { slug, ...content } : null;
  });

  const results = await Promise.all(contentPromises);
  return results.filter(
    (item): item is ContentData & { slug: string } => item !== null
  );
}
