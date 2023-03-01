import { UserService } from "../services/index.js";

export default app => {
    
    const userService = new UserService();
    
    app.get("/users", (req, res, next) => {
        res.send({ message: "user route"})
    })

    app.post("/users/register", async (req, res, next) => {
        try {
            const { login, password } = req.body;
            let result = await userService.registerUser({login, password});
            
            console.log(result);
            res.status(200).send({ message: "registered" })
        } catch (error) {
            console.log("run here")
            next(error);
        }
    })

    app.post("/users/login", async (req, res, next) => {
        try {
            const { login, password } = req.body;

            let result = await userService.loginUser({login, password});

            if (result)  {
                req.session.isConnected = true;
                req.session.user = result.login;
            }           

            console.log("update session ",req.session)

            res.status(200).send({ message: "user loged in.", user: result.login });

        } catch (error) {
            next(error);
        }
    })

    app.get("/logout", (req, res, next) => {
        req.session.destroy();
        res.send();
    })

    app.get("/users/isConnected", async (req, res, next) => {

        if (!req.session.isConnected) {
            res.status(200).send({ isLoggedIn: false });
        }
        else {
            let user = await userService.findUser({ login: req.session.user })
            
            res.json({ isLoggedIn : true, name: user.login })
          }
    })
}