const fs = require('fs/promises');
const path = require('path');

async function createDestinationDirectory(destDirectory) {
  await fs.rm(destDirectory, { recursive: true, force: true });
  await fs.mkdir(destDirectory, { recursive: true });
}

async function copyFoldersAndFiles(srcDirectory, destDirectory) {
  await createDestinationDirectory(destDirectory);
  const srcFiles = await fs.readdir(srcDirectory, { withFileTypes: true });
  for (const file of srcFiles) {
    const srcPath = path.join(srcDirectory, file.name);
    const destPath = path.join(destDirectory, file.name);
    if (file.isFile()) {
      fs.copyFile(srcPath, destPath);
    } else if (file.isDirectory()) {
      copyFoldersAndFiles(srcPath, destPath)
    }
  }
}

async function copyDir() {
  const srcDirectory = path.join(__dirname, 'files');
  const destDirectory = path.join(__dirname, 'files-copy');
  await createDestinationDirectory(destDirectory);
  await copyFoldersAndFiles(srcDirectory, destDirectory);
  console.log(`files copied to Destination Directory`);
}

copyDir().catch((err) => console.error(err.message));
