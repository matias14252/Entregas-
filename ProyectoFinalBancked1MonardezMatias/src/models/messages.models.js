import { Schema, model } from 'mongoose';

const messagesSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    postTime: {
        type: Date,
        default: Date.now
    }
});

export const messageModel = model('messages', messagesSchema);