import { Router } from "express";
import { getCart, createCart, insertProductCart, updateProductsCart, updateQuantityProductCart, deleteCart, deleteProductCart } from "../controllers/carts.controllers.js";

const cartRouter = Router()

cartRouter.get('/:cid', getCart)
cartRouter.post('/', createCart)
cartRouter.post('/:cid/products/:pid', insertProductCart)
cartRouter.put('/:cid', updateProductsCart)
cartRouter.put('/:cid/products/:pid', updateQuantityProductCart)
cartRouter.delete('/:cid', deleteCart)
cartRouter.delete('/:cid/products/:pid', deleteProductCart)

export default cartRouter