import cartModel from "../../models/Cart.js";
import BasicMongo from "./basicMongo.js";

class CartMongo extends BasicMongo {
    constructor(modelo) {
        super(modelo)
    }

}

export const cartMongo = new CartMongo(cartModel)

