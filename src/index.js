const http = require('http');
const path = require('path');
const fs = require('fs');

// Create a new server object
const server = http.createServer(
  (req, res) => {
    // Build file path
    const filePath = path.join(__dirname, '../', 'public',
    req.url === '/' ? 'index.html' : req.url);

    // Get file extension
    const extname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // Check extension and set content type
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
    }

    // Read file
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

    /* NOTE the below is a VERY BASIC example of how to serve assets
    its not efficient, but it communicates the general idea */
    /*
      if (req.url === '/') {
      fs.readFile(path.join(__dirname,'../', 'public', 'index.html'),
        (error, content) => {
          if (error) throw error;
          // Write HTTP Headers
          res.writeHead(200, { 'Content-Type': 'text/html'});
          // respond by sending content
          res.end(content);
        }
      );
    } else if (req.url === '/about') {
      fs.readFile(path.join(__dirname,'../', 'public', 'about.html'),
        (error, content) => {
          if (error) throw error;
          // Write HTTP Headers
          res.writeHead(200, { 'Content-Type': 'text/html'});
          // respond by sending content
          res.end(content);
        }
      );
    } else if (req.url === '/404') {
      fs.readFile(path.join(__dirname,'../', 'public', '404.html'),
        (error, content) => {
          if (error) throw error;
          res.writeHead(200, { 'Content-Type': 'text/html'});
          res.end(content);
        }
      );

    } else if (req.url === '/api/users') {
      // NOTE USUALLY THIS IS DATABASE DATA
      const users = [
        { name: 'Charles', age: 40},
        { name: 'Morgan', age: 40},
      ];
      res.writeHead(200, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify(users));
    }
    */
  }
);

// Specify port through process environment variables
const PORT = process.env.PORT || 5000;

// Listen for the server on PORT
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
