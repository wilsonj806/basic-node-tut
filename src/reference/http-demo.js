// NOTE this file is for the bare minimum to get a server running

const http = require('http');

// Create server object on Port 5000
  // NOTE a server needs to listen in on a port in order to work so you need
  // Server.listen(portNum, callbackFn)
http.createServer((request, response) => {
  // Write response when a request is made
  response.write('Hello World!');
  response.end();
}).listen(5000, () => console.log('Server is running'));

