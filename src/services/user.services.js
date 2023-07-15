import { userMongo } from "../DAL/DAOs/mongoDAOs/userMongo.js";
import { User } from '../DAL/DTO/user.js'
import { createHash } from "../utilis/bcrypt.js"

export class UsersService {
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
            const user = new User(response)
            return user.nameOnly()

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

export const usersService = new UsersService()