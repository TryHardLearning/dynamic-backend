import { Request, Response } from 'express';
import { HttpError } from '../utils/error.handle';
import { createProduct, deleteOneProduct, findAllProducts, findProductById } from '../services/product.service';

// Add new product
const handleCreateProduct = async (req: Request, res: Response) => {
    try {
        
        let { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
        
        const images = req.body.images;

        await createProduct(name, description, price, category, subCategory, sizes, bestSeller, images);

        return res.status(201).json({ success: true, message: 'Product created successfully' });
    
    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.status).json({ success: error.success, message: error.message });
        }

        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
// Get all products
const handleFindAllProducts = async (_: Request, res: Response) => {
    try {
        const products = await findAllProducts();
        return res.status(200).json({ success: true, products });
    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.status).json({ success: error.success, message: error.message });
        }

        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
// TODO: add security to this endpoint
const handleFindProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.body;
        
        const product = await findProductById(productId);
        
        return res.status(200).json({ success: true, product });
    
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.status).json({ success: error.success, message: error.message });
        }

        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    
    }
}
// TODO: add security to this endpoint
const handleDeleteOneProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.body;

        await deleteOneProduct(productId);
        
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.status).json({ success: error.success, message: error.message });
        }

        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    
    }
}

export { handleCreateProduct, handleFindAllProducts, handleFindProductById, handleDeleteOneProduct};