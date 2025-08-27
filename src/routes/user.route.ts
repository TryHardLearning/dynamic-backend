import express from 'express';
import { handleRegisterUser, handleLoginUser } from '../controllers/user.controller';
import { validateLogin, validateRegistration } from '../middleware/user.middleware';

const userRouter = express.Router();

userRouter.post('/login', validateLogin ,handleLoginUser);
userRouter.post('/register', validateRegistration ,handleRegisterUser);
// userRouter.post('/admin/login', adminLogin);

export default userRouter;