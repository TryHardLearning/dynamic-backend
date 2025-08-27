import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    shoppingBag: { type: Object, default: {} },

    role: { type: String, enum: ['user','seller','admin'], default: 'user' },

}, {minimize: false} );

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;