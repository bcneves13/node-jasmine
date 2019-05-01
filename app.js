const logger = require('./logger').createLogger();

const AirfluencersLogger = function() {

    this.validateLogLevel = (level) => {
        let avaliableLevels = ["error", "warn", "info", "debug"];
        // expect a valid level
        if (!avaliableLevels.includes(level.toLowerCase())) 
            throw "Not a valid log level"

        return level;
    }

    this.getSpTime = () => {
        let utcDate = new Date().toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo"})
        return utcDate;
    }

    this.getSpTimeFormatted = () => {
        let spTime = this.getSpTime();
        return `${spTime.getFullYear()}-${spTime.getMonth()+1}-${spTime.getDate()}T${spTime.getHours()+1}:${spTime.getMinutes()+1}:${spTime.getSeconds()+1}`
    }

    this.getLogFormatted = (message, level, data = {}) => {
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

    this.getLogJsonFormated = (message, level, data) => {
        //return json in string
        return JSON.stringify(this.getLogFormatted(message, level, data));
    }

    this.log = (msg, level, extra = {}, jsonString = false) => {

        log_str = this.getLogJsonFormated(msg, level, extra);
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

    this.info = (msg, extra = {}, jsonString = false) => {
        return log(msg, "info", extra, jsonString);
    }

    this.warn = (msg, extra = {}, jsonString = false) => {
        return log(msg, "warn", extra, jsonString);
    }

    this.error = (msg, extra = {}, jsonString = false) => {
        return log(msg, "error", extra, jsonString);
    }

    this.debug = (msg, extra = {}, jsonString = false) => {
        return log(msg, "debug", extra, jsonString);
    }
};

module.exports = AirfluencersLogger;
