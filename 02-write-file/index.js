const fs = require('fs');
const path = require('path');
const process = require('process');
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
  process.stdout.write('Good bye!');
  process.exit();
}