const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const srsDirectory = path.join(__dirname, 'styles');
const destDirectory = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(destDirectory);
let output = '';

async function mergeStyles() {
  const srcFiles = await fsPromises.readdir(srsDirectory);
  for (const file of srcFiles) {
    if (path.extname(file) === '.css') {
      const style = await fsPromises.readFile(path.join(srsDirectory, file));
    output += style + '\n';
    }
  }
  writeStream.write(output)
  console.log(`files copied to destDirectory`);
}

mergeStyles().catch((err) => console.error(err.message));