import { ordersModel } from "../../models/order.js";
import BasicMongo from "./basicMongo.js";

class OrdersMongo extends BasicMongo {
    constructor(model) {
        super(model)
    }

}

export const ordersMongo = new OrdersMongo(ordersModel)