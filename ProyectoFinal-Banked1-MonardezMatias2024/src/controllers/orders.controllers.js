import orderModel from "../models/order.model.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.aggregate([
            {
                $match: { size: "small" }
            },
            {

                $group: { _id: "$name", totalVentas: { $sum: "$price" } }
            },
            {
                $sort: { totalQuantity: 1 }
            },
            {
                $group: { _id: 1, orders: { $push: "$$ROOT" } }
            },
            {
                $project: {
                    "_id": 0,
                    orders: "$orders"
                }
            },
            {
                $merge: {
                    into: "reports"
                }
            }
        ])
        console.log(orders);

        res.status(200).send("Reportes generados")

    } catch (e) {
        console.log(e)
        res.status(500).send("Error al consultar ordenes:")
    }
}


export const createOrder = async (req, res) => {
    try {
        const order = req.body
        const respuesta = await orderModel.create(order)
        console.log(respuesta);
        res.status(201).send("Orden creada correctamente")
    } catch (e) {
        console.log(e);

        res.status(500).send("Error al crear Orden: ", e)
    }
}
