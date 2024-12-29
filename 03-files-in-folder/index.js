const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const directory = path.join(__dirname, 'secret-folder');

async function showFileInfo () {
  const srcFiles = await fsPromises.readdir(directory, { withFileTypes: true });
  for (const file of srcFiles) {
    if (file.isFile()) {
      const filePath = path.join(directory, file.name);
      const fileName = file.name.replace('.', " - ")
      fs.stat(filePath, (err, stats) => {
        if (err) {
          return console.error(err.message);
        }
        const fileSize = (stats.size / 1024);
        console.log(`${fileName} - ${fileSize}kb`);
      });
    }
  }
}
showFileInfo().catch((err) => console.error(err.message));

