import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/user.service';
import { HttpError } from '../utils/error.handle'; // Adjust the path as needed

const handleRegisterUser = async (req: Request, res: Response) => {
    try {

        let { name, email, password } = req.body;

        const { token } = await registerUser( name, email, password );
        
        return res.status(201).json({ success: true, message: 'User created successfully', token });
    
    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.status).json({ success: error.success, message: error.message });
        }

        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const handleLoginUser = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        
        const { token } = await loginUser( email, password );
        
        return res.status(200).json({ success: true, message: 'User logged in successfully', token });
    
    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.status).json({ success: error.success, message: error.message });
        }

        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export { handleRegisterUser, handleLoginUser };