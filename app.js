const airLogger = require('./lib/airfluencers-log');
console.log(airLogger);
// import AirfluencersLogger from './lib/airfluencers-log';

// const log = new AirfluencersLogger();
let log = new airLogger();

log.info("test Info");
log.error("test error");
log.warn("test warning");
log.debug("test debug");

