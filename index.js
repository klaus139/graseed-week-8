import express from 'express'
import dotenv from "dotenv"
import morgan from 'morgan'
import connectDB from './config/database.js'
import { ErrorMiddleWare } from './middleware/error.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js';
dotenv.config()

const app = express()

const port = process.env.port

connectDB();

app.use(express.json())
app.use(morgan('combined'))
app.use(express.urlencoded({extended:true}));


app.all('*', (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 400;
    next(err);
})
app.use(ErrorMiddleWare);

//routes
app.use('/api/user/', userRouter);
app.use('/api/product/', productRouter);


app.listen(port, () => console.log(`server is live`))