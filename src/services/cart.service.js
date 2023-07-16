import { cartMongo } from "../DAL/DAOs/mongoDAOs/cartMongo";

export class CartService {
    async getCartById(cart_id) {
        try {
            const response = await cartMongo.getCartById(cart_id)
            return response

        } catch (error) {
            return error
        }
    }

    async createCart(cart) {
        try {
            return await cartMongo.create(cart);
        } catch (err) {

        }
    }

    async deleteCartById(cart_id) {
        try {
            return await cartMongo.deleteCartById(cart_id);
        } catch (err) {

        }
    }

    async updateCart(cart_id, product_id) {
        try {
            return await cartMongo.updateCart(cart_id, product_id);
        } catch (err) {

        }
    }
}

export default new CartService()