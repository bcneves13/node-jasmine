'use strict';

const logger = require('logger').createLogger();

class AirfluencersLogger {
    constructor() {}

    validateLogLevel(level) {
        let avaliableLevels = ["error", "warn", "info", "debug"];
        // expect a valid level
        if (!avaliableLevels.includes(level.toLowerCase())) 
            throw "Not a valid log level"

        return level;
    }

    getSpTime() {
        let utcDate = new Date().toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo"})
        return utcDate;
    }

    getSpTimeFormatted() {
        let spTime = this.getSpTime();
        console.log(spTime.replace(" ", "T"));
        // return `${spTime.getFullYear()}-${spTime.getMonth()+1}-${spTime.getDate()}T${spTime.getHours()+1}:${spTime.getMinutes()+1}:${spTime.getSeconds()+1}`
        return spTime.replace(" ", "T");
    }

    getLogFormatted(message, level, data = {}) {
        /*
        Receives the log message, return the message in message field merged with the extrafields

        :param message: string
        :param level: info, warn, debug or error
        :param extrafields: dict
        :return: json
        */
        if ("message" in data)
            data["_message"] = data['message']

        let logObject = {
            "@timestamp": this.getSpTimeFormatted(),
            "level": this.validateLogLevel(level),
            "message": message,
            "data": data
        }
    }

    getLogJsonFormated(message, level, data) {
        //return json in string
        return JSON.stringify(this.getLogFormatted(message, level, data));
    }

    log(msg, level, extra = {}, jsonString = false) {

        let log_str = this.getLogJsonFormated(msg, level, extra);
        if (jsonString) 
            return log_str

        switch (level) {
            case "error":
                return logger.error(log_str);
            break;
            case "warn":
                return logger.warn(log_str);
            break;
            case "debug":
                return logger.debug(log_str);
            break;
            default:
                return logger.info(log_str);
            break;
            
        }
    }

    info(msg, extra = {}, jsonString = false) {
        return this.log(msg, "info", extra, jsonString);
    }

    warn(msg, extra = {}, jsonString = false) {
        return this.log(msg, "warn", extra, jsonString);
    }

    error(msg, extra = {}, jsonString = false) {
        return this.log(msg, "error", extra, jsonString);
    }

    debug(msg, extra = {}, jsonString = false) {
        return this.log(msg, "debug", extra, jsonString);
    }
};

module.exports = AirfluencersLogger;