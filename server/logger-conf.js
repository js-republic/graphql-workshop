const winston = require("winston");
const expressWinston = require("express-winston");
const LOG_LEVEL = "debug";

module.exports = {
  expressLogger: expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: false,
        colorize: true
      })
    ]
  }),
  logger: new winston.Logger({
    level: LOG_LEVEL,
    transports: [
      new winston.transports.Console({
        colorize: true
      })
    ]
  })
};
