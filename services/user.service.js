// Business logic will be here

import { UserRepository } from "../database/repository/index.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import { compare } from "bcrypt";

export default class UserService {

    constructor(){
        this.repository = new UserRepository();
    }

    async registerUser({ login, password }) {
        
        if (!login || !password) 
            throw new ErrorResponse("login and password are required", 400);
        
        const user = await this.repository.findUser({ login });
        
        if (user) 
            throw new ErrorResponse("user already registered");

        const newUser = await this.repository.registerUser({ login, password });
        
        return newUser;
    }

    async loginUser({ login , password}) {
        
        if (!login || !password) 
            throw new ErrorResponse("invalid credentials", 403);
        
        let user = await  this.repository.findUser({ login });
        
        if(!user)
            throw new ErrorResponse("invalid credentials", 403);        
        
        if (await compare(password, user.password)) {
            return { 
                message : "loged in",
                login : user.login
            }    
        }
        else {
            throw new ErrorResponse("invalid credentials", 403);
        }
    }


    async findUser({ login }) {
        const user = await this.repository.findUser({ login });
        
        if (!user) {
            throw new ErrorResponse("invalid credentials", 403);
        }

        return user;
    }

    async findUserTodos({ userId }) {
        await this.repository.findUserTodos({ userId });
    }

    async saveUserTodo({ login, title, completed }) {
        const user = await this.repository.findUser({ login });
        
        if (!user) {
            throw new ErrorResponse("invalid credentials", 403);
        }

        if (!title || completed == undefined || title == '') {
            throw new ErrorResponse("todo and completion state are required", 400);   
        }

        user.todos.push({ title, completed })
        
        user.save();
    }

}