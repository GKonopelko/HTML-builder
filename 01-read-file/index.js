// Import the necessary modules for task execution:
// To interact with the file system in Node.js, use the fs module
const fs = require('fs');
// For correctly specifying the file path, you will need the Path module
const path = require('path');
// Create a new ReadStream from the file text.txt.
const input = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
// Direct the read stream to the standard output stream
input.on('data', (data) => console.log(data));
