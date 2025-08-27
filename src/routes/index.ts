import { Router } from 'express';
import userRouter from './user.route';
import productRouter from './product.route';


const router = Router();

// User route
router.use('/users', userRouter);

// Product route
router.use('/product', productRouter);

export { router };
