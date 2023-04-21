import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartManager = new CartManager('./info.txt')

const cartRouter = Router()

// Ruta para crear un nuevo carrito
cartRouter.post('/', async (req, res) => {
    const nuevoCarrito = {
        id: CartManager.incrementarID(),
        products: []
    }

    res.status(201).json(nuevoCarrito)
})

// Ruta para listar los productos de un carrito
cartRouter.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.id)
    const carrito = cart.find(c => c.id === Number(req.params.cid))
    if (!carrito) {
        res.status(404).json({ message: 'Carrito no encontrado' })
    } else {
        res.json(carrito.products)
    }
})

cartRouter.post("/:cid/product/:pid'", async (req, res) => {
    const { id, quantity, idCart } = req.body
    await cartManager.addProductCart({ id, quantity, idCart })
    res.send("Producto agregado")
})


export default cartRouter