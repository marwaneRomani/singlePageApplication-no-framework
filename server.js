import express from "express";
import session from "express-session";
import cors from "cors";
import { todoRoute, userRoute } from "./api/index.js";
import { errorHandler } from "./api/middlewares/error.middleware.js"; 

export default async app => {
    
    app.use(express.static("./public"));
    // create a seesion for the user
    app.use(session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: true,
                cookie: { 
                httpOnly: true
                },
                expires: new Date(Date.now() + (30 * 86400 * 1000))
            }))
    


    app.use((req,res, next) => {
        if(!req.session.user)
            console.log("not a user");
        else
            console.log(req.session.user);  
        next();
    })


   // set up the body of the request
    app.use(express.json());
    app.use(cors())
    //api   
    userRoute(app);
    todoRoute(app);
    
    // error handling

    app.use(errorHandler);
}