const fs = require('fs');
const path = require('path');
const process = require('node:process');
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
process.stdout.write("Hello! What's you favorite food?\n");
process.stdin.on('data', (data) => {
  if (data.includes('exit')) {
    endProcess();
  }
  writeStream.write((data = data.toString()));
});
process.on('SIGINT', () => {
  endProcess();
});
function endProcess() {
  console.log('Good bye!');
  process.exit();
}
