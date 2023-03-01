import { Schema, model } from "mongoose";
import TodoSchema from "./todo.model.js";

const UserSchema= new Schema({
    login: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    todos:[
        TodoSchema
    ]
})

const User = model("user", UserSchema);

export default User;