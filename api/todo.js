import { UserService } from "../services/index.js";
import authMiddleware from "./middlewares/auth.middleware.js";


export default app => {
    
    const userService = new UserService( );

    app.get("/todos", authMiddleware , async (req, res, next) => {
        try {
            const login = req.session.user;
        
            const user = await userService.findUser({ login });
    
            res.send({ message: "todos ", todos: user.todos });   
        } catch (error) {
            next(error)
        }
    })

    app.get("/todos/:id", authMiddleware , async (req, res, next) => {
        try {
            const login = req.session.user;
            const { id }= req.params;
        
            const user = await userService.findUser({ login });
    
            res.send({ message: "todo ", todo: user.todos.filter(todo => todo._id == id ) });   
        } catch (error) {
            next(error)
        }
    })

    app.post("/todos", authMiddleware ,async (req, res, next) => {
        try {
            const { title, completed } = req.body;
            const login = req.session.user;
            
            console.log(title, completed)

            const user = await userService.findUser({ login });
            const newTodos = await userService.saveUserTodo({ login, title, completed });
            console.log(newTodos);
            res.status(200).send({ message: "todo saved", todos: newTodos });

        } catch (error) {
            next(error);
        }
    })
}