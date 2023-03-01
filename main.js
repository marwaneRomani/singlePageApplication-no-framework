import express from "express";
import { config } from "dotenv";
import { default as expressApp } from "./server.js";
import { default as databaseConnection } from "./database/dbConnection.js";



(async function StartServer() {
    config();
    const app = express();
    
    await databaseConnection();
    
    await expressApp(app);

    const port = process.env.port;
    app.listen(port, () => console.log(`listening to port ${port}`))
       .on('error', (err) => console.log(err))
})();

