import { userModel } from "../../models/user.js";
import BasicMongo from "./basicMongo.js";

class UserMongo extends BasicMongo {
    constructor(model) {
        super(model)
    }

}

export const userMongo = new UserMongo(userModel)


