import { Router } from "express";
import crypto from 'crypto'
import { __dirname } from '../path.js'
import { promises as fs } from 'fs';
import path from 'path';

const cartRouter = Router()

const carritosPath = path.resolve(__dirname, '../src/db/carritos.json'); //Dada una ruta, las concateno entre si (evito utiliza el +)

// Leer el archivo
const carritosData = await fs.readFile(carritosPath, 'utf-8');
const carritos = JSON.parse(carritosData);

//Consultar los productos guardados en un carritp
cartRouter.get('/:cid', (req, res) => {
    const idCarrito = req.params.cid
    const carrito = carritos.find(cart => cart.id == idCarrito)

    if (carrito) {
        console.log(carrito);

        res.status(200).send(carrito.products)
    } else {
        res.status(404).send({ mensaje: "El carrito no existe" })
    }
})

//Crear un nuevo carrito
cartRouter.post('/', async (req, res) => {
    const newCart = {
        id: crypto.randomBytes(5).toString('hex'),
        products: []
    }
    carritos.push(newCart)
    await fs.writeFile(carritosPath, JSON.stringify(carritos))
    res.status(200).send(`Carrito creado correctamente con el id ${newCart.id}`)
})

//Agregar nuevo producto al carrito
cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const idCarrito = req.params.cid
    const idProducto = req.params.pid
    const { quantity } = req.body

    const carrito = carritos.find(cart => cart.id == idCarrito)

    if (carrito) {
        const indice = carrito.products.findIndex(prod => prod.id == idProducto)

        if (indice != -1) { //Si el producto existe, piso con la nueva cantidad
            carrito.products[indice].quantity = quantity
        } else { //Si el producto no existe, lo creo y lo guardo
            carrito.products.push({ id: idProducto, quantity: quantity })
        }
        await fs.writeFile(carritosPath, JSON.stringify(carritos))
        res.status(200).send("Carrito actualizado correctamente")
    } else {
        res.status(404).send({ mensaje: "El carrito no existe" })
    }
})

export default cartRouter