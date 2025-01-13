import winston from 'winston';

const customLevelOpt = {
    levels: { 
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'cyan',
        info: 'blue',
        http: 'gray',
        debug: 'green'
    }
}

const logger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: [
        new winston.transports.File({ 
            filename: './errors.log',
            level: 'error',
            format: winston.format.simple()
        }),
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        })
    ]
});

export const addLogger = (req, res, next) => { 
    req.logger = logger;
    req.logger.info(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`); 
    next();
}