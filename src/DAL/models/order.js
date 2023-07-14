import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    order_number: {
        type: Number,
        require: true
    },

    user: {
        type: mongoose.SchemaType.objectId,
        ref: "users"
    },

    product: {
        type: mongoose.SchemaType.objectId,
        ref: "products"
    },
    price: {
        type: Number,
        required: true,
    }
})

export const ordersModel = mongoose.moderl('orders', ordersSchema)