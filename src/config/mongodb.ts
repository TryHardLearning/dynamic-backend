import mongoose from 'mongoose';

const createConnecetionDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Error database environment variable not defined!');
    }
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connection to MongoDB successfully established!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
};
export default createConnecetionDatabase;
