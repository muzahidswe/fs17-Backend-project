import winston from "winston";

/*
  How to use:
  errorLog.error({ "message": "Put your error log","time" : Date.now() });
  informationLog.info({ "message": "Put your info log","time" : Date.now() });
*/

export const informationLog = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "info-service-log" },
    transports: [
        new winston.transports.File({
            filename: "log/info/info.log",
            level: "info",
        }),
    ],
});

export const errorLog = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    defaultMeta: { service: "error-service-log" },
    transports: [
        new winston.transports.File({
            filename: "log/error/error.log",
            level: "error",
        }),
    ],
});