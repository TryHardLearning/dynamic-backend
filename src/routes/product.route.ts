import express from 'express';
import upload from '../middleware/multer';
import { handleCreateProduct, handleDeleteOneProduct, handleFindAllProducts, handleFindProductById } from '../controllers/product.controller';
import { validateCreateProduct, validateIdProduct } from '../middleware/product.middleware';

const productRouter = express.Router();

productRouter.post('/create', 
    upload.fields([
        {name: 'image1', maxCount: 1},
        {name: 'image2', maxCount: 1},
        {name: 'image3', maxCount: 1},
        {name: 'image4', maxCount: 1}
    ]),validateCreateProduct, handleCreateProduct);


productRouter.post('/delete', validateIdProduct, handleDeleteOneProduct);
productRouter.post('/find', validateIdProduct, handleFindProductById);
productRouter.get('/find', validateIdProduct, handleFindAllProducts);

export default productRouter;