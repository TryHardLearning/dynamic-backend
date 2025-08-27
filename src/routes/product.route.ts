import express from 'express';
// import { handleCreateProduct, handleFindAllProducts, handleFindProductById, handleDeleteOneProduct } from '../controllers/product.controller';
import upload from '../middleware/multer';
import { handleCreateProduct } from '../controllers/product.controller';

const productRouter = express.Router();

productRouter.post('/create', upload.fields([{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}]),handleCreateProduct);
// productRouter.post('/delete', handleDeleteOneProduct);
// productRouter.post('/find/id', handleFindProductById);
// productRouter.get('/find', handleFindAllProducts);

export default productRouter;