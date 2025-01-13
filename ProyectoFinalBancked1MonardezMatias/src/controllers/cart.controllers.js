import { cartModel } from '../models/carts.models.js';
import { productModel } from '../models/products.models.js';
import { ticketModel } from '../models/ticket.models.js';
import { userModel } from '../models/users.models.js';

export const getCart = async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await cartModel.findById(id);

        if (cart) {
            return res.status(200).send(cart);
        } 
        return res.status(404).send({ error: 'Carrito no encontrado' });
          
    } catch (error) {
        return res.status(500).send({ error: `Error en consultar carrito ${error}` });
    }
}

export const postCartProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {            
            const prod = await productModel.findById(pid); 

            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod._id == pid);
                if (index != -1) {
                    cart.products[index].quantity += quantity;
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity });
                }

                await cart.save();
                const updatedCart = await cartModel.findById(cid);
                return res.status(200).send(updatedCart);
            } 
            return res.status(404).send({ error: 'Producto no encontrado' });
        } 
        return res.status(404).send({ error: 'Carrito no encontrado' });

    } catch (error) {
        return res.status(500).send({ error: `Error en agregar producto al carrito ${error}` });
    }
}

export const deleteCartProduct = async (req, res) => {
    const { cid, pid } = req.params;
    
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid); 

            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod._id == pid);
                if (index != -1) {
                    cart.products.splice(index, 1);
                    await cartModel.findByIdAndUpdate(cid, cart);
                    return res.status(200).send(cart);
                } 
                return res.status(404).send({ error: 'Producto no encontrado en el carrito' });
            } 
            return res.status(404).send({ error: 'Producto no encontrado' });
        } 
        return res.status(404).send({ error: 'Carrito no encontrado' });
    
    } catch (error) {
        return res.status(500).send({ error: `Error en eliminar producto ${error}` });
    }
}

export const putCart = async (req, res) => {
    const { cid } = req.params;
    const newArray = req.body;

    try {
        let cart = await cartModel.findById(cid);
        if (cart) { 
            for (const prod of newArray) {
                const newProd = await productModel.findById(prod.id_prod);
                if (newProd) {
                    const index = cart.products.findIndex(item => item.id_prod._id == prod.id_prod);
                    if (index != -1) {
                        cart.products[index].quantity = prod.quantity;
                    } else {
                        cart.products.push({ id_prod: prod.id_prod, quantity: prod.quantity });
                    }
                } else {
                    res.status(404).send({ error: 'Producto no encontrado' });
                    return;
                }
            }
            await cart.save();
            cart = await cartModel.findById(cid).populate('products.id_prod');
            return res.status(200).send(cart);
        } 
        return res.status(404).send({ error: 'Carrito no encontrado' });

    } catch (error) {
        return res.status(500).send({ error: `Error en actualizar productos ${error}` });
    }
}

export const putCartProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid); 

            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod._id == pid);
            
                if (index != -1) {
                    cart.products[index].quantity = quantity;
                    await cartModel.findByIdAndUpdate(cid, cart);
                    return res.status(200).send(cart);
                } 
                return res.status(404).send({ error: 'Producto no encontrado en el carrito' });
            }
            return res.status(404).send({ error: 'Producto no encontrado' });
        } 
        return res.status(404).send({ error: 'Carrito no encontrado' });
        
    } catch (error) {
        return res.status(500).send({ error: `Error en actualizar producto ${error}` });
    }
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params;
    
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = [];
            await cartModel.findByIdAndUpdate(cid, cart);
            return res.status(200).send(cart);
        } 
        return res.status(404).send({ error: 'Carrito no encontrado' });        
        
    } catch (error) {
        return res.status(500).send({ error: `Error en eliminar carrito ${error}` });
    }
}

export const postCartPurchase = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }

        const user = await userModel.findOne({ cart: cart._id });

        if (!user) {
            return res.status(404).send({ error: 'No se encontró usuario vinculado al carrito' });
        }

        const products = cart.products;
        const insufficientStockProducts = [];
        let totalPrice = 0;

        for (const product of products) {
            const productInDatabase = await productModel.findById(product.id_prod._id);

            if (productInDatabase.stock < product.quantity) {
                insufficientStockProducts.push({ 
                    id_prod: { _id: product.id_prod._id },
                    name: product.id_prod.title,
                    quantity: product.quantity 
                });
            } else {
                productInDatabase.stock -= product.quantity;
                await productInDatabase.save();

                totalPrice += productInDatabase.price * product.quantity;
            }
        }

        if(user.rol == 'userPremium') {
            totalPrice *= 0.90
        }

        if (totalPrice > 0) {
            const newTicket = new ticketModel({
                amount: totalPrice, 
                purchaser: user.email, 
            });
            await newTicket.save();
        }

        cart.products = insufficientStockProducts;
        await cart.save();

        if (insufficientStockProducts.length === 0) {
            return res.status(200).send({ message: 'Compra completa' });
        } else {
            return res.status(400).send({ message: 'Compra incompleta', insufficientStockProducts });
        }

    } catch (error) {
        return res.status(500).send({ error: `Error en confirmar compra ${error}` });
    }
}
