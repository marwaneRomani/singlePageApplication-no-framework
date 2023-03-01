import { Schema, model } from "mongoose";


const TodoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    }
})


export default TodoSchema;