import { Request, Response, NextFunction } from 'express';

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        if (!name || !description || !price || !category || !sizes || !subCategory) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

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
        
        req.body.images = images;

        req.body.price = Number(price);
        req.body.bestSeller = bestSeller === 'true';
        req.body.sizes = JSON.parse(sizes);

        next();
    } catch (error) {
        if (error instanceof SyntaxError) {
            return res.status(400).json({ success: false, message: 'Invalid JSON format for sizes.' });
        }
        next(error);
    }
};
export const validateIdProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        next();
    } catch (error) {
        if (error instanceof SyntaxError) {
            return res.status(400).json({ success: false, message: 'Invalid JSON format for sizes.' });
        }
        next(error);
    }
}