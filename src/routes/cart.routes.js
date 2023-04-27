import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartManager = new CartManager('./cart.txt')

const cartRouter = Router()

// Ruta para crear un nuevo carrito
cartRouter.post('/', async (req, res) => {
    const nuevoCarrito = {
        id: CartManager.incrementarID(),
        products: ""
    }

    await cartManager.createCarrito({ nuevoCarrito })
    res.send("Producto en carrito")
})

// Ruta para listar los productos de un carrito
cartRouter.get('/:id', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.id)

    res.send(cart)
})

cartRouter.post("/:id/product/:id'", async (req, res) => {
    const { id, quantity, idCart } = req.body
    await cartManager.addProductCart({ id, quantity, idCart })
    res.send("Producto agregado")
})


export default cartRouter