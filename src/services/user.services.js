import { userMongo } from "../DAL/DAOs/mongoDAOs/userMongo.js";
import { User } from '../DAL/DTO/user.js'
import { createHash } from "../utilis/bcrypt.js"

export class UsersService {
    async findAllUsers() {
        try {
            const response = await userMongo.findAll()
            return response

        } catch (err) {
            throw new Error(err?.message)
        }
    }

    async findOneUser(id) {
        try {
            const response = await userMongo.findOneById(id)
            const user = new User(response)
            return user.nameOnly()

        } catch (err) {
            throw new Error(err?.message)
        }
    }

    async createUser(body, file) {
        try {
            const { username, email, age, address, phone, password } = body;
            const user = await this.getUserByUsername(username);

            if (user) {
                return user; // Already exist a user with that username
            }

            if (!user) {
                const hashedPassword = await bcrypt.hash(password, 8); // Encrypting the password
                const userCart = await CartService.createCart({
                    email: email,
                    products: [],
                    delivery_address: address,
                }) // Create a cart for this user
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    gender,
                    rol,
                    password: hashedPassword,
                    cart_id: userCart._id,

                };
                return await UserDAO.create(newUser);
            }
        } catch (err) {
            throw new Error(err?.message);
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