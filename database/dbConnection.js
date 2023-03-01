
import mongoose from "mongoose"
import { config } from "dotenv";

config();

export default  async () => {

    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.database_connection);
        console.log('Db Connected');
        
    } catch (error) {
        console.log(error.message);
    }
};

 