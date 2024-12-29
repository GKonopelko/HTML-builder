const fs = require('fs/promises');
const path = require('path');

async function createDestinationDirectory(destDirectory) {
  try {
    await fs.rm(destDirectory, { recursive: true, force: true });
    await fs.mkdir(destDirectory, { recursive: true });
  } catch (err) {
    console.error(err.message);
  }
}

async function copyFoldersAndFiles(srcDirectory, destDirectory) {
  try {
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
  } catch (err) {
    console.error(err.message);
  }
}

async function copyDir() {
  try {
    const srcDirectory = path.join(__dirname, 'files');
    const destDirectory = path.join(__dirname, 'files-copy');
    await createDestinationDirectory(destDirectory);
    await copyFoldersAndFiles(srcDirectory, destDirectory);
    console.log(`files copied to Destination Directory`);
  } catch (err) {
    console.error(err.message);
  }
}

copyDir();
