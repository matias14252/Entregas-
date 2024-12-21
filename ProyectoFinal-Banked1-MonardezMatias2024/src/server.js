import express from 'express'
import mongoose from 'mongoose'
import { create } from 'express-handlebars'
import { Server } from 'socket.io'
import path from 'path'
import { __dirname } from './path.js'
import productRouter from './routes/productos.routes.js'
import cartRouter from './routes/carritos.routes.js'
import multerRouter from './routes/imagenes.routes.js'
import chatRouter from './routes/chat.routes.js'
import orderRouter from './routes/orders.routes.js'

const app = express()
const hbs = create()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log("Server on port", PORT)
})

await mongoose.connect("mongodb+srv://franciscopugh01:@cluster0.uwgbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("BDD conectada"))
.catch((e) => console.log("Error al conectar con bdd: ", e))

//Inicializo Socket.io en el servidor
const io = new Server(server)
//Middlewares de aplicacion
app.use(express.json()) //Para manejar JSON en las peticiones
app.use(express.urlencoded({extended: true}))
//Configuracion de hbs para localizacion de plantillas y extension de archivo
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//Establezco el directorio de las vistas
app.set('views', path.join(__dirname, 'views'))

//Rutas de mi aplicacion
app.use('/public', express.static(__dirname + '/public'))//Defino la carpeta publica como destino de los archivos estaticos
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/chat', chatRouter)
app.use('/api/orders', orderRouter)
app.use('/upload', multerRouter)
app.get('/', (req,res) => {
    res.status(200).send("Ok")
})

let mensajes = []
//Conexiones de socket.io
//socket = info que llega de la conexion
io.on('connection', (socket) => { //Cuando se producza el "apreton de manos", puedo ejecutar las sigueintes funciones
    console.log('Usuario conectado: ', socket.id); //ID de conexion
    
    socket.on('mensaje', (data) => { //Cuando el usuario me envia un mensaje, trabajo con esos datos
        console.log('Mensaje recibido: ', data);
        mensajes.push(data)
        //Envia el array de mensajes
        socket.emit('respuesta', mensajes)
    })

    //Detectar desconexion
    socket.on('disconnect', ()=> {
        console.log('Usuario desconectado: ', socket.id);
        
    })
})

