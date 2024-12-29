const fs = require('fs/promises');
const path = require('path');
const destDirectory = path.join(__dirname, 'project-dist');

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
    const srcDirectory = path.join(__dirname, 'assets');
    const destDirectory = path.join(__dirname, 'project-dist','assets');
    await createDestinationDirectory(destDirectory);
    await copyFoldersAndFiles(srcDirectory, destDirectory);
    console.log(`files copied to Destination Directory`);
  } catch (err) {
    console.error(err.message);
  }
}

async function mergeStyles() {
  try {
    const fs = require('fs');
    const fsPromises = require('fs/promises');
    const path = require('path');
    const srsDirectory = path.join(__dirname, 'styles');
    const destDirectory = path.join(__dirname, 'project-dist', 'style.css');
    const writeStream = fs.createWriteStream(destDirectory);
    const srcFiles = await fsPromises.readdir(srsDirectory);
    let output = '';

    for (const file of srcFiles) {
      if (path.extname(file) === '.css') {
        const style = await fsPromises.readFile(path.join(srsDirectory, file));
      output += style + '\n';
      }
    }
    writeStream.write(output)
    console.log(`files copied to destDirectory`);
  } catch (err) {
    console.error(err.message);
  }
}

async function addComponentsToHtmlTemplate() {
  try {
    const componentsPath = path.join(__dirname, 'components');
    const componentsDir = await fs.readdir(componentsPath);
    let readTemplate = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');

    for (const file of componentsDir) {
      const fileName = path.basename((file),'.html');
      const fileContent = await fs.readFile(path.join(componentsPath, file),'utf-8');
      readTemplate = readTemplate.replace(`{{${fileName}}}`, fileContent);
    }
    await fs.writeFile(path.join(destDirectory, 'index.html'), readTemplate);
  } catch (err) {
    console.error(err.message);
  }
}

async function buildPageFromComponents() {
  try {
    await copyDir();
    await mergeStyles();
    await addComponentsToHtmlTemplate();
    console.log(`All files copied to destDirectory`);
  } catch (err) {
    console.error(err.message);
  }
}

buildPageFromComponents()