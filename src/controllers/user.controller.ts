import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// function to create JWT token
const createToken = (id: any) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET as string);
}

// route for user login
const loginUser = async (req: Request, res: Response) => {
    try {

        const dataRequest = req.body;

        if (!validator.isEmail(dataRequest.email)) {
            return res.status(400).json({ success:false, message: 'Invalid email' });
        }

        if (dataRequest.password.length < 8) {
            return res.status(400).json({ success:false, message: 'Invalid password' });
        }

        const user = await UserModel.findOne({ email: dataRequest.email });

        if(!user){
            return res.status(404).json({ success:false, message: 'User not found' });
        }

        const isUserPasswordValid = await bcrypt.compare(dataRequest.password, user.password);

        if(isUserPasswordValid){
            const token = createToken(user._id);
            return res.status(200).json({ success:true, message: 'User logged in successfully', token });
        }

        return res.status(404).json({ success:false, message: 'User not found' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: 'Error in Login' });
    }
}

// route for user register
const registerUser = async (req: Request, res: Response) => {
  try {
    
    const dataRequest = req.body;

    if (!validator.isEmail(dataRequest.email)) {
        return res.status(400).json({ success:false, message: 'Invalid email' });
    }
    if (!validator.isStrongPassword(dataRequest.password, { minSymbols: 1 })) {
        return res.status(400).json({ success:false, message: 'Weak password. It must have at least 8 characters, including uppercase, lowercase, number and symbol.' });
    }
    if(!validator.isLength(dataRequest.name, { min: 3 })) {
        return res.status(400).json({ success:false, message: 'Name must have at least 3 characters' });
    }
    const exists = await UserModel.findOne({ email: dataRequest.email });

    if (exists) {
      return res.status(409).json({ success:false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dataRequest.password, salt);

    const newUser = new UserModel({
        name: dataRequest.name,
        email: dataRequest.email,
        password: hashedPassword,
        role: 'user'
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    return res.status(201).json({success: true, message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, message: 'Error in Sign In' });
  }
}

// route for admin login
// const adminLogin = async (req: Request, res: Response) => {
//     // const { email, password } = req.body;
    
//     // try {
//     //     const token = await userService.adminLogin(email, password);
//     //     if (!token) {
//     //     return res.status(401).json({ message: 'Credenciais inválidas.' });
//     //     }
//     //     return res.status(200).json({ token });
//     // } catch (error) {
//     //     return res.status(500).json({ message: 'Erro ao fazer login.' });
//     // }
//     console.log(req.body);
//     res.json({ message: 'Rota de registro de usuário não implementada.' });


// }

export {loginUser, registerUser};