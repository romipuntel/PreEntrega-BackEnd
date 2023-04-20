import { promises as fs } from "fs"

export class CartManager {
    constructor(path) {
        this.path = path
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
    async createCarrito() {
        const cartJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartJSON)
        const carrito = {
            id: CartManager.incrementarID(),
            cantidad: []
        }
        carts.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito Creado"
    }

    async getCartById(id) {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        if (carts.some(cart => cart.id === parseInt(id))) {
            return carts.find(cart => cart.id === parseInt(id))
        } else {
            return "Carrito no encontrado"
        }
    }
    async addProductCart(id, quantity, idCart) {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        const carrito = carts.find(cart => cart.id === parseInt(idCart))
        if (carrito.products.some(product => product.id === parseInt(id))) {

            const productIndex = carrito.products.findIndex(p => p.id === parseInt(id))
            carrito.products[productIndex].quantity += parseInt(quantity)
        } else {

            carrito.products.push({
                id: parseInt(id),
                quantity: parseInt(quantity)
            })
        }
        const cartIndex = carts.findIndex(cart => cart.id === parseInt(idCart))
        carts[cartIndex] = carrito
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
    }
}
