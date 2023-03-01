import { compare, hash } from "bcrypt";
import { ErrorResponse } from "../../utils/ErrorResponse.js";
import { default as User } from "../models/user.model.js"

export default class UserRepository {

    async registerUser({ login, password }) {
        
        const hashedPassword = await hash(password, 10);

        const user = new User({ login, password: hashedPassword , todos: []});
        
        user.save()
            .then(result => result)
            .catch(error => {
                throw new ErrorResponse("please try again later",500)
            }); 
    }


    async findUser({ login }) {
        return await User.findOne({ login });
    }
}