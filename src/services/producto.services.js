import { prodMongo } from "../DAL/DAOs/mongoDAOs/productMongo.js";


export class ProductService {
    async getAllProducts() {
        try {
            const response = await prodMongo.findAll()
            return response

        } catch (err) {
            throw new Error(err?.message)
        }
    }

    async getProductById(product_id) {
        try {
            const response = await prodMongo.findOneById(product_id)
            return response

        } catch (err) {
            throw new Error(err?.message)
        }
    }

    async updateProduct(product_id, product) {
        try {
            return await prodMongo.updateById(product_id, product);
        } catch (err) {
            throw new Error(err?.message);
        }
    }

}

export default new ProductService()