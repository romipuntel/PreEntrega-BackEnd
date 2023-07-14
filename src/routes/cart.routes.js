import { Router } from "express";
import cartModel from "../DAL/models/Cart.js"
import prodModel from "../DAL/models/Product.js";

const cartRouter = Router()

// Crear un nuevo carrito
cartRouter.post("/", async (req, res) => {
    try {
        const cart = new cartModel();
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.log("Error al crear el carrito:", error);
        res.status(500).json({ error: "Error al crear el carrito" });
    }
})

// Agregar producto a un carrito
cartRouter.post("/:cartId/products/:productId", async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        const cart = await cartModel.findById(cartId);
        const product = await prodModel.findById(productId);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        cart.products.push({ id: productId, quantity }); // Utiliza el mismo nombre de campo
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.log("Error al agregar producto al carrito:", error);
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
})


// Ver todos los carritos y obtener los productos completos con populate
cartRouter.get("/", async (req, res) => {
    try {
        const carts = await cartModel.find().populate("products.id"); // Utilizar populate para obtener los productos completos
        res.json(carts);
    } catch (error) {
        console.log("Error al obtener los carritos:", error);
        res.status(500).json({ error: "Error al obtener los carritos" });
    }
});

// GET /api/carts/:cid
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cart = await cartModel.findById(cartId).populate('products.Id');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Eliminar todos los productos del carrito
cartRouter.delete("/:cartId/products", async (req, res) => {
    try {
        const { cartId } = req.params;

        const cart = await cartModel.findById(cartId);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        cart.products = []; // Vaciar el array de productos
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.log("Error al eliminar productos del carrito:", error);
        res.status(500).json({ error: "Error al eliminar productos del carrito" });
    }
})

// DELETE /api/carts/:cid/products/:pid
cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        const cart = await cartModel.findById(cartId);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        const productIndex = cart.products.findIndex(
            (item) => item.id.toString() === productId
        );

        if (productIndex === -1) {
            return res
                .status(404)
                .json({ error: "Producto no encontrado en el carrito" });
        }

        cart.products.splice(productIndex, 1);
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.log("Error al eliminar producto del carrito:", error);
        res.status(500).json({ error: "Error al eliminar producto del carrito" });
    }
})

// PUT /api/carts/:cid
cartRouter.put('/:cid', async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await cartModel.findById(cartId).populate("products.id"); // Utilizar populate para obtener los productos completos
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        res.json(cart.products);
    } catch (error) {
        console.log("Error al obtener los productos del carrito:", error);
        res.status(500).json({ error: "Error al obtener los productos del carrito" });
    }
})

// PUT /api/carts/:cid/products/:pid
cartRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        const cart = await cartModel.findById(cartId);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        const productIndex = cart.products.findIndex(
            (item) => item.id.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ error: "Producto no encontrado en el carrito" });
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.log("Error al modificar la cantidad del producto en el carrito:", error);
        res.status(500).json({ error: "Error al modificar la cantidad del producto en el carrito" });
    }
})

// DELETE /api/carts/:cid
cartRouter.delete('/:cid', async (req, res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.cid, { products: [] });
        res.json({ message: 'Carrito vaciado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al vaciar el carrito' });
    }
});
export default cartRouter