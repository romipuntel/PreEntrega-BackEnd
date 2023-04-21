import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager('./info.txt')

const productRouter = Router()

productRouter.get('/', async (req, res) => {
    const productos = await productManager.getProducts()
    const limit = req.query.limit
    if (limit) {
        productos = productos.slice(0, limit)
    }

    res.send(JSON.stringify(productos))
})
productRouter.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.id)
    res.render('product', {
        title: product.title,
        description: product.description,
        price: product.price,
        code: product.code,
        stock: product.stock

    })

})


productRouter.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    await productManager.addProduct({ title, description, price, thumbnail, code, stock })
    res.send("Producto creado")
})

productRouter.put("/:pid", async (req, res) => {
    const id = req.params.id
    const { title, description, price, thumbnail, code, stock } = req.body

    const mensaje = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock })

    res.send(mensaje)
})

productRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await productManager.deleteProduct(id)
    res.send(mensaje)
})


export default productRouter