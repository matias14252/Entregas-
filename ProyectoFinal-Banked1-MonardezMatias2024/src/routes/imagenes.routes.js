import { Router } from "express";
import { uploadProds } from "../config/multer.js";

const multerRouter = Router()

multerRouter.post('/products', uploadProds.single('product'), (req,res) => {
    console.log(req)
    res.status(200).send("Imagen cargada")
})

export default multerRouter