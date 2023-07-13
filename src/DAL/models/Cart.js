import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const cartSchema = new Schema({
    products: {
        "id": false,
        type: [
            {

                id_prod: {
                    type: Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number
            }
        ],
        default: []
    }
})

cartSchema.plugin(paginate)


const cartModel = model("cart", cartSchema,);

export default cartModel