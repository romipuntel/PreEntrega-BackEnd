import { promises as fs } from 'fs'


export class ProductManager {
    constructor(path) {
        this.path = path
        this.productos = []
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }


    async saveProductsToFile() {
        try {
            //const data = this.productos.map((productos) => JSON.stringify(productos))
            await fs.writeFile(this.path, JSON.stringify(this.productos, null, 2), "utf-8")
        } catch (err) {
            console.error(err)
        }
    }

    async addProduct(producto) {
        const id = this.productos.length > 0 ? this.productos[this.productos.length - 1].id + 1 : 1;
        const newProduct = { id, ...producto }
        this.productos.push(newProduct)
        await this.saveProductsToFile()
        return "Producto creado"
    }


    async getProducts() {
        const product = await fs.readFile(this.path, 'utf-8')
        return product
    }

    async getProductById(id) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            return prods.find(prod => prod.id === parseInt(id))
        } else {
            return "Producto no encontrado"
        }
    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            let index = prods.findIndex(prod => prod.id === parseInt(id))
            prods[index].title = title
            prods[index].description = description
            prods[index].price = price
            prods[index].thumbnail = thumbnail
            prods[index].code = code
            prods[index].stock = stock
            await this.saveProductsToFile()
            return "Producto actualizado"
        } else {
            return "no encontrado"
        }
    }
    async deleteProduct(id) {
        const index = this.productos.findIndex((producto) => producto.id === id)
        if (index !== -1)
            this.productos.splice(index, 1)
        await this.saveProductsToFile()
        return "Producto eliminado"
    }
}


