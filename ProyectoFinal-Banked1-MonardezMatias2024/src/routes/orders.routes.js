import {Router} from 'express'

import { getOrders, createOrder } from '../controllers/orders.controllers.js';

const orderRouter = Router()

orderRouter.get('/', getOrders) 

orderRouter.post('/', createOrder) 

export default orderRouter