import { Request, Response } from 'express';
import { HttpError } from '../utils/error.handle';
import { createProduct, deleteOneProduct, findAllProducts, findProductById } from '../services/product.service';

// Add new product
const handleCreateProduct = async (req: Request, res: Response) => {
    try {
        
        let { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        // Access files from req.files
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const image1 = files.image1 && files.image1?.[0];
        const image2 = files.image2 && files.image2?.[0];
        const image3 = files.image3 && files.image3?.[0];
        const image4 = files.image4 && files.image4?.[0];
        
        // Filter out undefined files
        const images: Array<Express.Multer.File> = [image1, image2, image3, image4].filter((file): file is Express.Multer.File => file !== undefined);
        
        if (images.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one image is required.' });
        }

        // Convert price to number, bestSeller to boolean and sizes to array
        price = Number(price);
        bestSeller = bestSeller === true;
        sizes = JSON.parse(sizes);

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
const handleDeleteOneProduct = async (req: Request, res: Response) => {
    try {

        await deleteOneProduct(req.body.id);
        
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