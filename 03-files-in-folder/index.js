const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, 'secret-folder');

fs.readdir(directory, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.error('Error ', err.message)}
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(directory, file.name);
      const fileName = file.name.replace('.', " - ")
      fs.stat(filePath, (err, stats) => {
        if (err) {
          return console.error('Error ', err.message)}
        const fileSize = (stats.size / 1024);
        console.log(`${fileName} - ${fileSize}kb`);
      });
    }
  });
});