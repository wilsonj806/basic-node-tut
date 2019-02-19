const os = require('os');
const path = require('path');

// ID current platform
console.log(os.platform());

// CPU architecture
console.log(os.arch());

// CPU core info
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// Total memory
console.log(os.totalmem());

// Home dirr
console.log(os.homedir());

// Uptime
console.log(os.uptime());