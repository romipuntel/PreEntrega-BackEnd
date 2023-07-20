import { UsersService } from "../services/user.services.js";
import logger from "../utilis/logger.js";

class UserController {

    async renderLoginView(req, res) {
        try {
            res.status(200);
            logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/login.ejs");
        } catch (err) {
            res.status(500);
            logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/error.ejs", {
                code: 500,
                message: "Internal Server Error",
            })
        }
    }
    async findAllUsers(req, res) {
        try {
            const allUsers = await UsersService.findAllUsers()
            res.status(200).json({ message: 'users', allUsers })
        } catch (error) {
            res.status(500).json({ massage: 'error', error })
        }
    }

    async findOneUser(req, res) {
        const { idUser } = req.params
        try {
            const user = await UsersService.findOneUser(id)
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

export const userController = new UserController()