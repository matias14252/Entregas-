import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.js';
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { productModel } from './models/products.models.js';
import { messageModel } from './models/messages.models.js';
import router from './routes/index.routes.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();
const PORT = 8080;

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('BD conectada')
    })
    .catch(() => console.log('Error en conexion a BD'));

app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

initializePassport();
app.use(passport.initialize());

const io = new Server(serverExpress);
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado");
    
    socket.on('newProduct', async (newProd) => {
        try {
            await productModel.create(newProd);
            const newProducts = await productModel.find().lean();
            socket.emit('prods', newProducts);
        } catch (error) {
            if (error.code == 11000) { 
                socket.emit('error', { error: 'Producto ya creado con llave duplicada' });
            }
        }
    })

    socket.on('message', async (messageInfo) => {
        await messageModel.create(messageInfo);
        const newMessage = await messageModel.find().lean();
        socket.emit('messages', newMessage);
    })
});

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: "Documentación de proyecto E-Commerce",
            description: "Proyecto Backend de un E-Commerce para aprobar curso Backend de Coderhouse"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('/', router);





