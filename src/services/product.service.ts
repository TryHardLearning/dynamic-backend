import { v2 as cloudinary } from 'cloudinary';
import ProductModel from '../models/product.model';
import { HttpError } from '../utils/error.handle';

const uploadImages = async (images: Express.Multer.File[]): Promise<string[]> => {
    if (!Array.isArray(images)) {
        throw new Error('Images must be an array.');
    }

    let imagesUrl = await Promise.all(
        images.map(async (file) => {
            if (!file.path) {
                throw new HttpError('Image path not found.', 500);
            }
            const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
            return result.secure_url;
        })
    );
    return imagesUrl;
};

const createProduct = async (name: string, description: string, price: number, category: string, subCategory: string, sizes: Array<string>, bestSeller: boolean, images: Array<any>) => {
    
    console.log(images);
    const imageUrls = await uploadImages(images);

    const product = new ProductModel({
        name, 
        description, 
        price, 
        category, 
        subCategory, 
        sizes, 
        bestSeller,
        image: imageUrls,
    });

    console.log(product);

    await product.save();
    return product;
};
const findAllProducts = async () => {

}
const findProductById = async () => {

}
const deleteOneProduct = async () => {

}

export {createProduct, findAllProducts, findProductById, deleteOneProduct};