import ProductService from "../services/producto.services.js";

class ProductoController {
    async getProducts(req, res) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query
            const options = {}
            options.limit = parseInt(limit)
            options.skip = (parseInt(page) - 1) * parseInt(limit)

            const queryOptions = query ? { title: { $regex: query, $options: "i" } } : {}
            const totalCount = await ProductService.countDocuments(queryOptions)
            const totalPages = Math.ceil(totalCount / limit)

            // Calcular el número de elementos a saltar (skip) según la página solicitada
            const skip = (page - 1) * limit;

            // Construir la consulta de búsqueda con los parámetros proporcionados
            let productosQuery = ProductService.find(queryOptions).skip(skip).limit(parseInt(limit, 10));

            // Aplicar el ordenamiento si se proporciona el parámetro sort
            if (sort === 'asc') {
                productosQuery = productosQuery.sort({ precio: 1 }); // Orden ascendente por precio
            } else if (sort === 'desc') {
                productosQuery = productosQuery.sort({ precio: -1 }); // Orden descendente por precio
            }

            const productos = await productosQuery.exec();

            const result = {
                status: 'success',
                payload: productos,
                totalPages,
                prevPage: page > 1 ? parseInt(page) - 1 : null,
                nextPage: page < totalPages ? parent(page) + 1 : null,
                page: parseInt(page),
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                prevLink: page > 1 ? `http://localhost:4000/products?limit=${limit}&page=${parseInt(page) - 1}&sort=${sort}&query=${query}` : null,
                nextLink: page < totalPages ? `http://localhost:4000/products?limit=${limit}&page=${parseIint(page) + 1}&sort=${sort}&query=${query}` : null
            };

            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
        }
    }

}

export const prodController = new ProductoController()