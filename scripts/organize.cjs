const fs = require('fs').promises;
const path = require('path');

const parentDir = path.resolve(__dirname, '../src');
const destinationFolder = path.resolve(parentDir, '../collected_files');

const fileExtensions = [
  '.ts',
  '.js',
  '.mjs',
  '.astro',
  '.config',
  '.md',
  '.json',
];

async function organizeFiles(currentDir) {
  try {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        if (fullPath !== destinationFolder) {
          await organizeFiles(fullPath);
        }
      } else if (entry.isFile()) {
        const fileExt = path.extname(entry.name).toLowerCase();

        // Check if the file has one of the specified extensions
        if (
          fileExtensions.includes(fileExt) ||
          entry.name.toLowerCase().endsWith('.config')
        ) {
          const destinationPath = path.join(destinationFolder, entry.name);

          // If a file with the same name exists, append a number
          let uniqueDestinationPath = destinationPath;
          let counter = 1;
          while (await fs.stat(uniqueDestinationPath).catch(() => false)) {
            const parsedPath = path.parse(destinationPath);
            uniqueDestinationPath = path.join(
              parsedPath.dir,
              `${parsedPath.name}_${counter}${parsedPath.ext}`
            );
            counter++;
          }

          // Copy the file to the destination folder
          await fs.copyFile(fullPath, uniqueDestinationPath);
          console.log(`Copied ${entry.name} to destination folder`);
        }
      }
    }
  } catch (err) {
    console.error('Error processing directory:', currentDir, err);
  }
}

async function main() {
  // Create destination folder if it doesn't exist
  await fs.mkdir(destinationFolder, { recursive: true });

  // Start the recursive process from the parent directory
  await organizeFiles(parentDir);
  console.log('File organization complete.');
}

main().catch((err) => console.error('An error occurred:', err));
