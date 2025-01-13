import { Router } from 'express';
import userRouter from './users.routes.js';
import sessionsRouter from './sessions.routes.js';
import prodsRouter from './products.routes.js';
import cartRouter from './cart.routes.js';
import viewsRouter from './views.routes.js';
import loggerRouter from './logger.routes.js';
import express from 'express';
import { __dirname } from '../path.js';
import path from 'path';

const staticMiddleware = express.static(path.join(__dirname, '/public'));
const sharedRoutes = ['/home', '/realtimeproducts', '/realtimechat', '/userregister', '/userlogin', '/userprofile', '/usersmanagement', '/cart'];
const router = Router();

sharedRoutes.forEach((route) => {
    router.use(route, staticMiddleware);
});
router.use('/api/users', userRouter);
router.use('/api/products', prodsRouter);
router.use('/api/cart', cartRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/', viewsRouter);
router.use('/', loggerRouter);


 
export default router;
