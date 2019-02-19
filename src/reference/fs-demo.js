const fs = require('fs');
const path = require('path');

// Create folder
fs.mkdir(path.join(__dirname,'/test'), {}, (error) => {
  if(error) throw error;
  console.log('Folder created');
});

// Create and write to file
fs.writeFile(path.join(__dirname,'/test', 'hello.txt'),
'Hello there!',
(error) => {
  if(error) throw error;


  // Append to an existing file
  fs.appendFile(path.join(__dirname,'/test', 'hello.txt'),
  ' Node.js rocks!',
  (error) => {
    if(error) throw error;
    console.log('File written too');
  });

});

// Read file
fs.readFile(path.join(__dirname,'/', 'hello2.txt'),
  'utf8',
  (error, data) => {
    if(error) throw error;
    console.log(`File read, here's the data:
    ${data}`);
});

// Rename file
fs.rename(path.join(__dirname,'/', 'hello2.txt'),
  path.join(__dirname,'/', 'renamed.txt'),
  (error) => {
    if(error) throw error;
    console.log(`File renamed`);
});