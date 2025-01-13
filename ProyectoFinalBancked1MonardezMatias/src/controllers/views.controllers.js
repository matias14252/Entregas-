import { productModel } from '../models/products.models.js';
import { userModel } from '../models/users.models.js';
import { cartModel } from '../models/carts.models.js';
import jwt from 'jsonwebtoken';

export const checkCookie = (req, res, next) => {
    try {
        if (req.signedCookies.jwtCookie) {
            return res.redirect('/userprofile');
        }
        return next();
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

export const getHome = async (req, res) => {
    try {
        const products = await productModel.find().lean();
        const homeData = {
            title: 'Home',
            products: products,
            js: 'js/home.js'
        }

        if (req.signedCookies.jwtCookie) {
            const userToken = req.signedCookies.jwtCookie;
            const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
            
            homeData.user = decoded.user;
        }
        
        res.render('home', homeData);
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

export const getRealtimeProducts = async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render('realTimeProducts', {
            title: 'Productos en tiempo real',
            products: products,
            js: 'js/realtimeProducts.js'
        });
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

export const getRealtimeChat = async (req, res) => {
    try {
        res.render('chat', {
            title: 'Chat',
            js: 'js/chat.js'
        });
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

export const getUserRegister = async (req, res) => {
    try {
        res.render('userRegister', {
            title: 'Registro de usuario',
            js: 'js/userRegister.js'
        });
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

export const getUserLogin = async (req, res) => {
    try {
        res.render('userLogin', {
            title: 'Login',
            js: 'js/userLogin.js'
        });
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

export const getuserProfile = async (req, res) => {
    try {
        res.render('userProfile', {
            title: 'Perfil usuario',
            js: 'js/userProfile.js',
            user: req.user
        });
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

export const getUsersInfo = async (req, res) => {
    try {
        const users = await userModel.find().lean();
        res.render('usersManagement', {
            title: 'Gestion de usuarios',
            js: 'js/usersManagement.js',
            users: users
        });
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

export const getCart = async (req, res) => {
    try {
        if (req.signedCookies.jwtCookie) {
            const userToken = req.signedCookies.jwtCookie;
            const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
            
            const cartId = decoded.user.cart;
            const cart = await cartModel.findById(cartId);
            const cartProducts = cart.products.map(product => ({
                id: product.id_prod._id,
                title: product.id_prod.title,
                price: product.id_prod.price,
                quantity: product.quantity
            }));

            const cartTotal = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
            
            res.render('cart', {
                title: 'Cart',
                cartId: cartId,
                cartProducts: cartProducts,
                cartTotal: cartTotal,
                js: 'js/cart.js'
            });
        }
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}




