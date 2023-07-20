import { cartMongo } from "../DAL/DAOs/mongoDAOs/cartMongo";

export class CartService {
    async getCartById(cart_id) {
        try {
            const response = await cartMongo.getCartById(cart_id)
            return response

        } catch (error) {
            throw new Error(err?.message)
        }
    }

    async createCart(cart) {
        try {
            return await cartMongo.create(cart)
        } catch (err) {
            throw new Error(err?.message)
        }

    }
    async createProductOfACart(cart_id, product) {
        try {
            let { products, total } = await this.getCartById(cart_id);
            const productInCart = products.find((item) =>
                item._id.equals(product._id)
            );
            total = total + product.price;
            if (!productInCart) {
                product.in_cart = 1;
                return await CartDAO.createProductOfACart(cart_id, product, total);
            }
            product.in_cart = productInCart.in_cart + 1;
            return await CartDAO.createProductOfACart(cart_id, product, total);
        } catch (err) {
            throw new Error(err?.message)
        }
    }

    async deleteCartById(cart_id) {
        try {
            return await cartMongo.deleteCartById(cart_id);
        } catch (err) {
            throw new Error(err?.message)
        }
    }

    async updateCart(cart_id, product_id) {
        try {
            return await cartMongo.updateCart(cart_id, product_id);
        } catch (err) {
            throw new Error(err?.message)
        }
    }
}

export default new CartService()