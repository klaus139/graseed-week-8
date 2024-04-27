import bcrypt from 'bcryptjs'
import User from "../models/userModel.js"
import jwt from "jsonwebtoken";
import ErrorHandler from '../middleware/errorHandler.js';

export const Register = async(req, res, next) => {
    try{
        const isExisting = await User.findOne({email:req.body.email})
        if(isExisting){
            throw new Error('Email already exists, please login')
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = await User.create({...req.body, password:hashPassword})

        const {password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id, isAdmin:newUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: '5h'});
        return res.status(201).json({others, token})
    }catch(error){
        return next(new ErrorHandler(error.message, 500));
    }
}

export const Login = async(req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email}) 
       if(!user){
          throw new Error("User credentials are wrong!")
       }

       // 123456, [lkoiuytfdrse5rd6tfgyhijopk[l;]'\[pkojiugyftdrzsdxtfycghu]]
       const comparePass = await bcrypt.compare(req.body.password, user.password)
       if(!comparePass){
        throw new Error("User credentials are wrong!")
       }

       const {password, ...others} = user._doc
       const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '5h'})

       return res.status(200).json({others, token})
        
    }catch(error){
        return next(new ErrorHandler(error.message, 500));
    }
}