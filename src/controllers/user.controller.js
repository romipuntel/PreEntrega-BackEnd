import { UsersService } from "../services/user.services.js";

export class UserController {
    async findAllUsers(req, res) {
        try {
            const allUsers = await UsersService.findAllUsers()
            res.status(200).json({ message: 'users', allUsers })
        } catch (error) {
            res.status(500).json({ massage: 'error', error })
        }
    }

    async findOneUsers(req, res) {
        const { idUser } = req.params
        try {
            const user = await UsersService.findOneUsers(id)
            res.status(200).json({ message: 'user', user })
        } catch (error) {
            res.status(500).json({ massage: 'error', error })
        }
    }

    async createOneUser(req, res) {
        const { first_name, last_name, email, password } = req.body
        if (!first_name || !last_name || !email || !password) {
            res.status(401).json({ message: "falta informacion" })
        }
        try {
            const newUser = await UsersService.createOneUser(req.body)
            res.status(200).json({ message: 'user created', newUser })
        } catch (error) {
            res.status(500).json({ massage: 'error', error })
        }
    }


    async deleteOne(req, res) {
        const { idUser } = req.params
        try {
            const user = await UsersService.deleteOneUser(idUser)
            res.status(200).json({ message: 'user deleted', user })
        } catch (error) {
            res.status(500).json({ massage: 'error', error })
        }
    }
}