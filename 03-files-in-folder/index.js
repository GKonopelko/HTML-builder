const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, (err, item) => {
  if (err) {
    console.log(err);
  }
  item.forEach((file) => {
    const pathToFile = path.join(pathToFolder, file);
    fs.stat(pathToFile, (err, item) => {
      if (err) {
        console.log(err);
      }
      if (item.isFile()) {
        const extention = path.extname(file).slice(1);
        const name = path.parse(file).name;
        const size = Math.ceil(item.size / 1024);
        console.log(`${name} - ${extention} - ${size}kb`);
      }
    });
  });
});
