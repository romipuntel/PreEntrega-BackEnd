import { userMongo } from "../DAL/DAOs/mongoDAOs/userMongo.js";
import { createHash } from "../utilis/bcrypt.js"

class UsersService {
    async findAllUsers() {
        try {
            const response = await userMongo.findAll()
            return response

        } catch (error) {
            return error
        }
    }

    async findOneUser(id) {
        try {
            const response = await userMongo.findOneById(id)
            return response

        } catch (error) {
            return error
        }
    }

    async createOneUser(user) {

        try {
            const hashPassword = createHash(user.password)
            const newUser = { ...user, password: hashPassword }
            const response = await userMongo.createOne(newUser)
            return response

        } catch (error) {
            return error
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await userMongo.deleteOne(id)
            return response

        } catch (error) {
            return error
        }
    }
}