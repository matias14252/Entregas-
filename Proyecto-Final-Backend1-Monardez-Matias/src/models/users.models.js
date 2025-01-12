import { Schema, model } from 'mongoose';
import { cartModel } from './carts.models.js';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'user'
    },
    cart: { 
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    documents: {
        type: [
            {
                name: {
                    type: String
                },
                reference: {
                    type: String
                }
            }
        ]
    },
    last_connection: {
        type: Number
    }
});

userSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const newCart = await cartModel.create({});
            this.cart = newCart._id;
        }
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.updateLastConnection = async function () {
    try {
        this.last_connection = Date.now();
        await this.save();
    } catch (error) {
        console.error('Error al actualizar la última conexión:', error);
        throw error;
    }
};

export const userModel = model('users', userSchema);


