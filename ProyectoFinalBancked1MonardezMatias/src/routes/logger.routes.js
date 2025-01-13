import { Router } from 'express';
import { addLogger } from '../config/logger.js';

const loggerRouter = Router();

loggerRouter.get('/loggerTest', addLogger, async (req, res) => {
    req.logger.fatal('Fatal');
    res.send({message: 'Prueba logger'});
});

export default loggerRouter;

