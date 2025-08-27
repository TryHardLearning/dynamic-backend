import { Request, Response, NextFunction } from 'express';

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
      
        if (!name || !description || !price || !category || !sizes || !subCategory) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

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