import { prodMongo } from "../DAL/DAOs/mongoDAOs/productMongo.js";


export class ProdService {
    async getAllProducts() {
        try {
            const response = await prodMongo.findAll()
            return response

        } catch (error) {
            return error
        }
    }

    async getProductById(product_id) {
        try {
            const response = await prodMongo.findOneById(product_id)
            return response

        } catch (error) {
            return error
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

export default new ProdService()