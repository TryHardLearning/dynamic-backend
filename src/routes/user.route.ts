import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
// userRouter.post('/admin/login', adminLogin);

export default userRouter;