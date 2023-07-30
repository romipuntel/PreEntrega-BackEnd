import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",

};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.colorize({ all: true }),

)

const level = () => {
    return "debug";
};

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "./src/logs/warn.log",
        level: "warn",
        colorize: true,
        json: true,
    }),
    new winston.transports.File({
        filename: "./src/logs/error.log",
        level: "error",
        colorize: true,
        json: true,
    }),
];


export const logger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "http",
            format: winston.format.combine(
                winston.format.colorize({ colors: levelOptions.colors }),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "src/logs/fatal.log",
            level: "fatal",
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "src/logs/error.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "src/logs/warning.log",
            level: "warning",
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "src/logs/info.log",
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "src/logs/http.log",
            level: "http",
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.simple()
            )
        })
    ]
});