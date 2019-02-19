// NOTE Its a core module so you don't need a file path
const path = require('path');

// Base file name
console.log(path.basename(__filename));

// Directory name
console.log(path.dirname(__filename));

// File extension
console.log(path.extname(__filename));

// Create path object
console.log(path.parse(__filename));

// Concat paths
const test = '../test/hello.html';
console.log(path.join(__dirname, 'test', 'hello.html'));