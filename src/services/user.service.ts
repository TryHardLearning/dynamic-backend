import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../utils/error.handle';

const createToken = (id: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async ( name: string, email: string, password: string ) => {

    const exists = await UserModel.findOne({ email });
    if (exists) {
        throw new HttpError('User already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        role: 'user'
    });

    const user = await newUser.save();
    const token = createToken(user._id as string);
    
    return { user, token };
};

const loginUser = async ( email: string, password: string ) => {

    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new HttpError('Invalid email or password', 400);
    }

    const isUserPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isUserPasswordValid) {
        throw new HttpError('Invalid email or password',400);
    }

    const token = createToken(user._id as string);
    return { user, token };
};

export { registerUser, loginUser };