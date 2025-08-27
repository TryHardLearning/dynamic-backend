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
// TODO: add security to this function
const createProduct = async (name: string, description: string, price: number, category: string, subCategory: string, sizes: Array<string>, bestSeller: boolean, images: Array<any>) => {
    
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

    return await product.save();
    
};
const findAllProducts = async () => {
    return await ProductModel.find({});
}
// TODO: add security to this function
const findProductById = async (id: string) => {
    return await ProductModel.findById(id);
}
// TODO: add security to this function
const deleteOneProduct = async (id: string) => {
    return await ProductModel.findByIdAndDelete(id);
}

export {createProduct, findAllProducts, findProductById, deleteOneProduct};