import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const prodSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
    },

    price: {
        type: Number,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
})

prodSchema.plugin(paginate)

const prodModel = model("products", prodSchema);

export default prodModel