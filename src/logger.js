// This is a practical example of using Node.js's Events module
const EventEmitter = require('events');
const uuid = require('uuid');

// uuid makes universal user ids or something

class Logger extends EventEmitter {
  log(message) {
    // call event
    this.emit('message', {id: uuid.v4(), message: message});
  }
}

const Logger = require('../logger');

const logger = new Logger();

// NOTE Event listener for logger
logger.on('message', (data) => {
  /* NOTE the Event Emitter is done with logger.log(), which triggers logger.on()
    * Functionally logger.on() is analogous to logger.addEventListener() if were were
    * working in the DOM
    */
  console.log(`
  Event listener called
  Called Listener id: ${data.id}
  Called Listener message: ${data.message}
  `);
});

logger.log('Hello there!');
logger.log('yerr');
logger.log('dab on the h8t3rs');