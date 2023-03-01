import { TodoRepository } from "../database/repository/index.js";

export default class TodoService {
        constructor() {
            this.repository = new TodoRepository();
        }

        async findUserTodos({ login }) {
            
        }

        async createUserTodo({ login }) {
            
        }

        async deleteUserTodo({ login }) {
            
        }
        
        async updateUserTodo({ login }) {
            
        }
}