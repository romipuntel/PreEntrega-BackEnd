import { model, Schema } from "mongoose";
import { ProdSchema } from "./Product.js";



const PurchaseDateSchema = new Schema({
    number: { type: String, require: true },
    day: { type: String, require: true },
    month: { type: String, require: true },
    year: { type: String, require: true },
})


const OrderSchema = new Schema(
    {
        products: { type: [ProdSchema], require: true },
        state: { type: String, require: true, default: "Generada" },
        buyer_email: { type: String, require: true },
        purchase_date: { type: PurchaseDateSchema, require: true },
        total: { type: Number, require: true },
    },
    {
        timestamps: true,
    }
);


export const ordersModel = model('order', OrderSchema)