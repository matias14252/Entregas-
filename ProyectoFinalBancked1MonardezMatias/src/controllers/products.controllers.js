import { productModel } from '../models/products.models.js';
import { faker } from '@faker-js/faker';

export const getProducts = async (req, res) => {
    const { limit, page, category, status, sort } = req.query;
    const parsedLimit = isNaN(parseInt(limit)) ? 10 : parseInt(limit);
    const parsedCategory = category === 'undefined' ? '' : category;
    const parsedStatus = status === 'undefined' ? '' : status;
    const parsedSort = sort === 'undefined' ? undefined : sort;

    try {
        const queryObj = {};
        if (parsedCategory) {
            queryObj.category = parsedCategory;
        }
        if (parsedStatus) {
            queryObj.status = parsedStatus;
        }

        const prods = await productModel.paginate(queryObj, { limit: parsedLimit, page: parseInt(page) || 1, sort: parsedSort ? { price: parsedSort } : undefined, customLabels: { docs: 'payload' } });


        const response = {
            status: 'success',
            payload: prods.payload,
            totalPages: prods.totalPages,
            prevPage: prods.prevPage,
            nextPage: prods.nextPage,
            page: prods.page,
            hasPrevPage: prods.hasPrevPage,
            hasNextPage: prods.hasNextPage,
            prevLink: prods.hasPrevPage ? `/api/products?limit=${limit}&page=${prods.prevPage}&category=${parsedCategory}&status=${parsedStatus}&sort=${sort}` : null,
            nextLink: prods.hasNextPage ? `/api/products?limit=${limit}&page=${prods.nextPage}&category=${parsedCategory}&status=${parsedStatus}&sort=${sort}` : null
        };

        if (prods) {
            return res.status(200).send(response);
        } else {
            return res.status(404).send({ error: 'Productos no encontrados' });
        }
        
    } catch (error) {
        return res.status(500).send({ error: `Error en consultar productos ${error}` });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const prod = await productModel.findById(id);

        if (prod) {
            return res.status(200).send(prod);
        } 
        return res.status(404).send({ error: 'Producto no encontrado' });

    } catch (error) {
        return res.status(500).send({ error: `Error en consultar producto ${error}`});
    }
}

export const postProduct = async (req, res) => {
    const { title, description, stock, code, price, category } = req.body;
    try {
        const prod = await productModel.create({ title, description, stock, code, price, category });

        if (prod) {
            return res.status(201).send(prod);
        }
        return res.status(400).send({ error: `Error en crear producto` });
    
    } catch (error) {
        if (error.code == 11000) { 
            return res.status(400).send({ error: 'Producto ya creado con llave duplicada' })
        }
        return res.status(500).send({ error: `Error en crear producto ${error}` }); 
    }
}

export const putProductById = async (req, res) => {
    const { id } = req.params;
    const { title, description, stock, status, code, price, category } = req.body;

    try {
        const prod = await productModel.findByIdAndUpdate(id, { title, description, stock, status, code, price, category }, { new:true });

        if (prod) {
            return res.status(200).send({ message: 'Producto actualizado', prod });
        }
        return res.status(404).send({ error: 'Producto no encontrado' });

    } catch (error) {
        return res.status(500).send({ error: `Error en actualizar producto ${error}` });
    }
}

export const deleteProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const prod = await productModel.findByIdAndDelete(id);

        if (prod) {
            return res.status(200).send(prod);
        }
        return res.status(404).send({ error: 'Producto no encontrado' });

    } catch (error) {
        return res.status(500).send({ error: `Error en eliminar producto ${error}` });
    }
}

export const getMockingProducts = async (req, res) => {
    try {
        const modelProduct = () => {
            return {
                _id: faker.database.mongodbObjectId(),
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                stock: faker.number.int(),
                category: faker.commerce.department(),
                status: true,
                code: faker.commerce.isbn(),
                thumbnails: faker.image.urlPicsumPhotos()
            }
        }

        const products = []

        for (let i = 0; i < 100; i++) {
            products.push(modelProduct());
        }

        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send(`Error interno del servidor: ${error}`);
    }
}

    
