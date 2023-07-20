export default class BasicMongo {
    constructor(modelo) {
        this.modelo = modelo
    }
    async findAll() {
        try {
            const response = await this.modelo.find()
            return response

        } catch (error) {
            return error
        }
    }

    async findOneById(id) {
        try {
            const response = await this.modelo.findOneById(id)
            return response

        } catch (error) {
            return error
        }
    }

    async createOne(obj) {
        try {
            const response = await this.modelo.createOne(obj)
            return response

        } catch (error) {
            return error
        }
    }

    async deleteOne(id) {
        try {
            const response = await this.modelo.deleteOne(id)
            return response

        } catch (error) {
            return error
        }
    }
}
