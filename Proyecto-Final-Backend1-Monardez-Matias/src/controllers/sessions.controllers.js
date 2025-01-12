import { generateToken } from '../utils/jwt.js';
import { userModel } from '../models/users.models.js';

export const postLogin = async (req, res) => {
    try {
        const token = generateToken(req.user);

        await req.user.updateLastConnection();
        
        res.cookie('jwtCookie', token, {
            maxAge: 43200000,
            signed: true,
            httpOnly: true
        });
        return res.status(200).send({ message: 'Login válido' });
    } catch (error) {
        return res.status(500).send({ error: `Error al iniciar sesión ${error}` });
    }
}

export const postRegister = async (req, res) => {
    try {
        return res.status(201).send({ message: 'Usuario creado con éxito' })
    } catch (error) {
        return res.status(500).send({ error: `Error al registrar usuario ${error}` })
    }
}

export const getGithubCallback = async (req, res) => {
    try {
        const token = generateToken(req.user);

        await req.user.updateLastConnection();

        res.cookie('jwtCookie', token, {
            maxAge: 43200000,
            signed: true,
            httpOnly: true
        });
        
        return res.redirect('/home');
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

export const getLogout = async (req, res) => { 
    try {
        const user = await userModel.findById(req.user.user._id);
        
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        await user.updateLastConnection();

        res.clearCookie('jwtCookie');
    
        return res.status(200).send({ message: 'Usuario deslogueado' });
    } catch (error) {
        return res.status(500).send({ error: `Error interno del servidor: ${error}`});
    }
}

export const getCurrentToken = async (req, res) => {
    res.send(req.user);
}