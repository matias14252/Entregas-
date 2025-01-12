import { userModel } from '../models/users.models.js';
import { sendRecoveryMail, sendDeleteMail } from '../config/nodemailer.js';
import crypto from 'crypto';
import { createHash } from '../utils/bcrypt.js';
import { join } from 'path';

const recoveryLinks = {}

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, { _id: 0, first_name: 1, last_name: 1, email: 1 });

        if (users) {
            return res.status(200).send(users);
        } else {
            return res.status(404).send({ error: 'Usuarios no encontrados' });
        }
    } catch (error) {
        return res.status(500).send({ error: `Error en consultar usuarios ${error}` });
    }
}

export const passwordRecovery = async (req, res) => {
    const { email } = req.body;

    try {
        const token = crypto.randomBytes(20).toString('hex');

        recoveryLinks[token] = { email: email, timestamp: Date.now() }

        const recoveryLink = `http://localhost:8080/api/users/reset-password/${token}`;

        sendRecoveryMail(email, recoveryLink);

        return res.status(200).send('Correo de recuperación enviado');
    } catch (error) {
        return res.status(500).send(`Error al enviar el mail ${error}`);
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, newPassword2 } = req.body;

    try {
        const linkData = recoveryLinks[token]; 
        if (linkData && Date.now() - linkData.timestamp <= 3600000) { 
            const { email } = linkData;

            if (newPassword == newPassword2) {
                const user = await userModel.findOne({ email: email });
                if (user) {
                    user.password = createHash(newPassword);
                    await user.save();

                    delete recoveryLinks[token];

                    return res.status(200).send('Contraseña modificada correctamente');
                } else {
                    return res.status(404).send('Usuario no encontrado');
                }
            } else {
                return res.status(400).send('Las contraseñas deben ser idénticas');
            }
        } else {
            return res.status(400).send('Token inválido o expirado. Pruebe nuevamente');
        }
    } catch (error) {
        return res.status(500).send(`Error al modificar contraseña ${error}`);
    }
}

export const postDocuments = async (req, res) => {
    const { uid } = req.params;

    try {
        const user = await userModel.findById(uid);
        if (user) {
                const files = req.files;
                const newDocuments = files.map(file => ({
                    name: file.originalname,
                    reference: join(file.destination, file.filename)
                }));

                user.documents.push(...newDocuments);
                await user.save();

                return res.status(200).send('Documentos subidos correctamente');
        } else {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ error: `Error al subir archivo ${error}` });
    }
}

export const deleteUsers = async (req, res) => {
    try {
        const twoDays = 2 * 24 * 60 * 60 * 1000;
        const currentDate = new Date().getTime();

        const users = await userModel.find({ last_connection: { $lt: currentDate - twoDays } });

        if (users && users.length > 0) {
            const userEmails = users.map(user => user.email);
            
            await userModel.deleteMany({ _id: { $in: users.map(user => user._id) } });
            userEmails.forEach(email => {
                sendDeleteMail(email);
            });

            return res.status(200).send({ message: 'Usuarios eliminados correctamente' });
        } else {
            return res.status(404).send({ error: 'No se encontraron usuarios para eliminar' });
        }
    } catch (error) {
        return res.status(500).send({ error: `Error en eliminar usuarios ${error}` });
    }
}

export const deleteUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const deletedUser = await userModel.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        } else {
            return res.status(200).send({ message: 'Usuario eliminado correctamente' });
        }
    } catch (error) {
        return res.status(500).send({ error: `Error en eliminar usuario ${error}` });
    }
}
