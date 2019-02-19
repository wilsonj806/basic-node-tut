# Notes

## Table of Contents

- [References](#References)
- [Node Basics](#Node-basics)
- [Node Syntax](#Node-syntax)
- [Core Node Modules](#Core-node-modules)
  - [Path Module](##path-module)
  - [File System Module](##file-system-module)
  - [OS Module](##os-module)
  - [URL Module](##url-module)
  - [Event Module](##event-module)
  - [HTTP Module](##HTTP-module)
- [How To Build A Simple Node App](#How-to-build-a-simple-Node-app)

## References

- [Traversy Media: Node Crash Course](https://youtu.be/fBNz5xF-Kx4)
- [Node v11 API Reference](https://nodejs.org/dist/latest-v11.x/docs/api/)

## Node basics

- Before any work in a text editor, it's worth noting that Node has a build in repl
  - repl is short for: `read-evaluate-print-loop` and it allows you to run javascript commands in the CLI
- Node CLI also lets run local files via the below syntax:
  ```bash
  node <file-path-here>
  ```

## Node syntax

- Node lets you define modules similar to ES6 modules
  - difference here is that Node uses module.export instead
  ```js
    const person = {
      name: 'John',
      age: 30
    }
    module.export = person;
  ```
- This then gets imported via CommonJS `require` statements like the below:
```js
const person = require('./file-name');
```
- The way it does that is that, the resulting file ends up getting wrapped in an IIFE that looks like the below:
  ```js
    (function (exports, require, module, __filename, __dirname) {
      // module implementation here
    })
  ```
- Note that the `__filename` and `__dirname` args are both keywords that are defined by Node that let you get the current file path and the directory path respectively
- Also ES6 `import` is not implemented in Node just yet

## Core Node Modules

**The Node API docs are really good with getting examples of what every method does by the way. Reference that if you need help.**

### Path Module

- The `path` module provides utilities for working with files and file paths
- In the above example that `__filename` actually gives you the entire file path
- `path.basename()` only provides the relevant file name
  ```js
    const path = require('path');
    console.log(path.basename(__filename));
  ```
- `path.dirname()` does a similar thing to `__dirname` but uses path instead
  - its probably pretty nice if you only want to use `__filename` for consistency
- `path.extname()` gives you the extension of the input file
- `path.parse()` returns an object with the following keys
  ```js
    // Given a file named app.js in './src'
    const path = require('path');
    const pathObj = path.parse(__filename);
    console.log(pathObj)
    // expcting it to return:
    {
      root: 'E:\\',
      dir: 'E:\\SOFTWARE-DEV\\Projects\\Tutorials\\basic-node-tut\\src\\reference',
      base: 'path-demo.js',
      ext: '.js',
      name: 'path-demo'
    }
  ```
- `path.join()` lets you concat paths together
  ```js
  console.log(path.join(__dirname, 'test', 'hello.html'));
  // returns E:\\SOFTWARE-DEV\\Projects\\Tutorials\\basic-node-tut\\src\\reference\\test\\hello.html
  ```
- This is super nice because delimiters on Windows is different from delimited from Macs
  - note the double '\\' versus '/' on Macs and Linux

### File System Module

- The file system module is all about manipulating files and file directories
- Note that unless the method name specifies it, most file system utilities are *asynchronous*
- `fs.mkdir()` *asynchronously* creates a directory
  - it takes a callback function in args
  - there's also a synrchrounous version
  - make directory's args are as follows:
    ```js
      const fs = require('fs');
      const path = require('path');
      fs.mkdir(path.join(__dirname,'/test'), optionsObject, callbackFn)
    ```
  - where the callback function is to be called on completion
    - you can make it an error catching function if anything
- `fs.writeFile()` works about the same way
  - only difference being that its for writing to a file
  - if the file doesn't exist, then it creates it
  - if the file *DOES* exist, then it overwrites the contents of it
- If you want to add to a file then you want to use `fs.appendFile()`
- `fs.rename()` is for renaming files or probably moving files as well
  - takes args:
    ```js
      fs.rename(current_dir, new_dir, callbackFn)
    ```

### OS module

- This one is interesting, the OS module reports current system info such as OS, OS architecture, etc
- This module's probably nicer for debugging and other stuff like that

### URL module

- The URL module is for manipulating URLs and getting data from it
- So this is not to be confused with the URL *interface*
  - the URL interface is a thing that can be instantiated through the constructor like so:
    ```js
      const myUrl = new URL('http://mywebsite.com')
      ```
  - see the MDN reference on the [URL interface](https://developer.mozilla.org/en-US/docs/Web/API/URL) for more
- to get the serialized URL, nothing else attached you can use `myUrl.href` *OR* `myUrl.toString()`
- to get the host/ root domain, use `myUrl.host`
- to get the host name, use `myUrl.hostname`
  - Note, the difference between the two is that `myUrl.hostname` doesn't return a port if there's is one specified
- to get the pathname to the file use `myUrl.pathname`
- to get a serialized version of the URL queries use `myUrl.search`
- to return the above as an object use `myUrl.searchParams`
  - should return something like the below
    ```bash
      URLSearchParams { 'id' => '100', 'status' => 'active' }
    ```
  - also note that this search params object is pretty similar to the ClassList object
  - this means you can append properties to it like so:
    ```js
      myUrl.searchParams.append('abc','123');
      console.log(myUrl.searchParams);
      // returns:
      // URLSearchParams { 'id' => '100', 'status' => 'active' }
      ```
  - it also means you can loo through it like so:
    ```js
      myUrl.searchParams.forEach((value, name) => {
        console.log(`${name}: ${value}`);
      })
      ```

### Event module

- Here's a link to the Node docs reference on [Events](https://nodejs.org/dist/latest-v11.x/docs/api/events.html)
- To use it you instantiate it as a class object then add listeners as needed
  - see below:
    ```js
      const EventEmitter = require('events');

      class MyEmitter extends EventEmitter{}
      const myEmitter = new MyEmitter();
      ```
- See `../src/logger` for a working example of how to use events

### HTTP module

- The HTTP module handles everything related to HTTP requests and responses
- It also lets you start development servers with about 4 lines of code like the below:
  ```js
    http.createServer((request, response) => {
      response.write('Hello world!');
      response.end();
    }).listen(5000, () => console.log('Server is running on port 5000'));
    ```
  - So creating a server is kind of done in two parts
    - first you define what your server responds with
    - then you tell Node what port to listen to via the physical port number OR via checking `process.env.PORT`
      - this operation is done with `httpServerObj.listen()`
  - Then inside the `http.createServer()` you define a callback function that gets run when the server is started
    - so the callback function takes two arguments, a `request` param, and a `response` param
    - within that callback, we can tell Node to return any number of things in the response such as:
      - JSON data
      - plain text
      - HTML
    - also note that you need to tell the server that the response has been sent with all the relevant headers/ data with `response.end()`

## How To Build A Simple Node App

- So the app in this project is super basic
  - when you access it, it returns one of 4 pages and some extras
  - said files are in `./public`
- Reference the file in `./src/index` for implementation details
- As with before we use `http.createServer()` but with some small differences
  ```js
    const server = http.createServer(callbackFn);
    const callbackFn = (req, res) => {

    }
    ```
- First, we actually assign the server to a variable that way we can do extra stuff with it
  - fairly simple, but also worth mentioning since the HTTP module can do far more than what is done here
- Then within that callback function, we build the file path up using the below:
  ```js
    const filePath = path.join(__dirname,
      '../',
      'public',
      req.url === '/' ? 'index.html' : req.url);
    );
   ```
  - note that the file path we build uses a ternary operator/ expression to return the file name based on the request
  - in the browser, said request would be made by entering something like the following:
    - localhost:5000/about.html
- From that file path we can then fetch the extension of the requested file and then use that to determine `contentType`
- So all together we have:
  ```js
    const filePath = path.join(__dirname,
        '../',
        'public',
        req.url === '/' ? 'index.html' : req.url);
      );
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch(contentType) {
      // A big block for determining content type based on file extension
    }
    ```
- So we have the file path, and the content type for the requested stuff, which means we can then fetch and read the file that the user wants
  ```js
    fs.readFile(filePath,
        (error, content) => {
          if (error) {
            // Check error properties
            if (error.code == 'ENOENT') {
              // Page not found
              fs.readFile(path.join(__dirname, '../', 'public', '404.html'),
              (error , content) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf8');
              });
            } else {
              // Some server error (500)
              res.writeHead(500);
              res.end(`Server Error: ${error.code}`);
            }} else{
              // Success
              res.writeHead(200, { 'Content-Type': contentType });
              res.end(content, 'utf8');
            }
        });
    ```
- Note that the callback function has several conditionals for handling various status codes
- If we get an error then we check for the below:
  - if Node returns 'ENOENT' then that means the request asset wasn't found by the server
    - this means that we'll read and return the `404.html` page to the server using:
    ```js
      fs.readFile(path.join(__dirname, '../', 'public', '404.html'),
        (error , content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      ```
  - otherwise the Node error is probably a different server error and then we return something simlar to the above
- If there is no error, then we are free to load our content and it looks like the below:
  ```js
    // ... conditionals for catching errors above
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf8');
    ```
