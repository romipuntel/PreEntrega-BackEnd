import { Router } from "express";
import { CartManager } from "../CartManager";

const cartManager = new CartManager('./info.txt')

const cartRouter = Router()

// Ruta para crear un nuevo carrito
cartRouter.post('/', async (req, res) => {
    const nuevoCarrito = {
        id: generarId(),
        products: []
    }
    cartManager.push(nuevoCarrito)
    res.status(201).json(nuevoCarrito)
})

// Ruta para listar los productos de un carrito
cartRouter.get('/:cid', async (req, res) => {
    const carrito = cartRouter.find(c => c.id === Number(req.params.cid))
    if (!carrito) {
        res.status(404).json({ message: 'Carrito no encontrado' })
    } else {
        res.json(carrito.products)
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const carrito = cartManager.find(c => c.id === Number(req.params.cid))
    if (!carrito) {
        res.status(404).json({ message: 'Carrito no encontrado' })
    } else {
        const productId = Number(req.params.pid);
        const existingProduct = carrito.products.find(p => p.id === productId)
        if (existingProduct) {
            existingProduct.quantity++
        } else {
            carrito.products.push({
                id: productId,
                quantity: 1
            })
        }
        res.json(carrito.products)
    }
})

export default cartRouter