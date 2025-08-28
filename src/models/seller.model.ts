// import mongoose from "mongoose";

// const sellerSchema = new mongoose.Schema({
//     name: { type: String, required: true },

//     email: { type: String, required: true, unique: true },

//     company: { type: Object, required: true },

//     password: { type: String, required: true },

//     onSellerProducts: { type: Object, default: {} },

//     role: { type: String, enum: ['seller','admin'], default: 'seller' },

// }, {minimize: false} );

// const SellerModel = mongoose.models.Seller || mongoose.model('Seller', sellerSchema);

// export default UserModel;