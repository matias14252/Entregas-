import express from 'express'
import { create } from 'express-handlebars'
import path from 'path'
import { __dirname } from './path.js'
import productRouter from './routes/productos.routes.js'
import cartRouter from './routes/carritos.routes.js'
import multerRouter from './routes/imagenes.routes.js'

const app = express()
const hbs = create()
const PORT = 8080

//Middlewares de aplicacion
app.use(express.json()) //Para manejar JSON en las peticiones
app.use(express.urlencoded({ extended: true }))
//Configuracion de hbs para localizacion de plantillas y extension de archivo
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//Establezco el directorio de las vistas


app.use('/static', express.static(__dirname + '/public'))//Defino la carpeta publica como destino de los archivos estaticos
app.set('views', path.join(__dirname, 'views'))
console.log(__dirname);

//app.set('views',__dirname + '/src/views')

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/upload', multerRouter)
const productos = [
    { nombre: "te", marca: "virginia", precio: 2450, stock: 12, status: true },
    { nombre: "Hamburguesa", marca: "oklahoma", precio: 2230, stock: 22, status: true },
    { nombre: "Arroz", marca: "tio nacho", precio: 1330, stock: 42, status: false }
]
//res.render('nombre-plantilla', {objetos a enviar})
app.get('/', (req, res) => {
    res.render('productos', { productos })
})

app.listen(PORT, () => {
    console.log("Server on port", PORT)
})