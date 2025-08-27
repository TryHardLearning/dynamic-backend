import { Request, Response } from 'express';
import { HttpError } from '../utils/error.handle';
import { v2 as cloudinary } from 'cloudinary';
import ProductModel from '../models/product.model';

// Add new product
const handleCreateProduct = async (req: Request, res: Response) => {
    try {
        
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const image1 = files.image1 && files.image1?.[0];
        const image2 = files.image2 && files.image2?.[0];
        const image3 = files.image3 && files.image3?.[0];
        const image4 = files.image4 && files.image4?.[0];

        const images: Array<Express.Multer.File> = [image1, image2, image3, image4].filter((file): file is Express.Multer.File => file !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (file) => {
                if (!file.path) {
                    throw new Error('Missing required parameter - file path');
                }
                let result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData ={
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === 'true',
            image: imagesUrl,
        }

        // Save product to database

        const product = new ProductModel(productData);

        await product.save();

        return res.status(201).json({ success: true, message: 'Product created successfully' });
    
    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.status).json({ success: error.success, message: error.message });
        }

        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// const handleFindAllProducts = async (req: Request, res: Response) => {

// }
// const handleFindProductById = async (req: Request, res: Response) => {

// }
// const handleDeleteOneProduct = async (req: Request, res: Response) => {

// }

export { handleCreateProduct,/* handleFindAllProducts, handleFindProductById, handleDeleteOneProduct */};