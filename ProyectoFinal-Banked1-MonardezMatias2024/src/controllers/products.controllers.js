import productModel from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const { limit, page, filter, metFilter, ord } = req.query

        const pag = page !== undefined ? page : 1
        const lim = limit !== undefined ? limit : 10
        const query = metFilter !== undefined ? { [metFilter]: filter } : {}
        const orQuery = ord !== undefined ? { price: ord } : {}

        const prods = await productModel.paginate(query, { limit: lim, page: pag, orQuery })

        console.log(prods);
        res.status(200).send(prods)

    } catch (e) {
        res.status(500).send("Error al consultar productos: ", e)
    }
}

export const getProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const prod = await productModel.findById(idProd)
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto no existe")
    } catch (e) {
        res.status(500).send("Error al consultar producto: ", e)
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = req.body
        const respuesta = await productModel.create(product)
        console.log(respuesta);
        res.status(201).send("Producto creado correctamente")
    } catch (e) {
        console.log(e);

        res.status(500).send("Error al crear producto: ", e)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const updateProduct = req.body
        const respuesta = await productModel.findByIdAndUpdate(idProd, updateProduct)
        res.status(200).send("Producto actualizado correctamente")
    } catch (e) {
        console.log(e);

        res.status(500).send("Error al actualizar producto: ", e)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const respuesta = await productModel.findByIdAndDelete(idProd)
        res.status(200).send("Producto eliminado correctamente")
    } catch (e) {
        res.status(500).send("Error al eliminar producto: ", e)
    }
}