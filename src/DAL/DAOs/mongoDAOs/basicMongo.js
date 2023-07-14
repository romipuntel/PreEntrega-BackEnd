export default class BasicMongo {
    constructor(model) {
        this.model = model
    }
    async findAll() {
        try {
            const response = await this.model.find()
            return response

        } catch (error) {
            return error
        }
    }

    async findOneById(id) {
        try {
            const response = await this.model.findOneById(id)
            return response

        } catch (error) {
            return error
        }
    }

    async createOne(obj) {
        try {
            const response = await this.model.createOne(obj)
            return response

        } catch (error) {
            return error
        }
    }

    async deleteOne(id) {
        try {
            const response = await this.model.deleteOne(id)
            return response

        } catch (error) {
            return error
        }
    }
}
