import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
         
        });
        console.log(`Database connected`);
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
    
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;
