import mongoose from "mongoose";


const PurchaseDateSchema = new Schema({
    number: { type: String, require: true },
    day: { type: String, require: true },
    month: { type: String, require: true },
    year: { type: String, require: true },
})


const ordersSchema = new mongoose.Schema(
    {
        order_number: {
            type: Number,
            require: true
        },

        product: {
            type: mongoose.SchemaType.objectId,
            ref: "products"
        },
        buyer_email: {
            type: String,
            require: true
        },
        purchase_date: {
            type: PurchaseDateSchema,
            require: true
        },
        total: {
            type: Number,
            require: true
        },
    })


export const ordersModel = mongoose.model('orders', ordersSchema)