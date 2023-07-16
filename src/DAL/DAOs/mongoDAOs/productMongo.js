import prodModel from "../../models/Product.js";
import BasicMongo from "./basicMongo.js";

class ProdMongo extends BasicMongo {
    constructor(model) {
        super(model)
    }

}

export const prodMongo = new ProdMongo(prodModel)