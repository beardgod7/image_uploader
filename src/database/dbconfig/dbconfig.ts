import mongoose from 'mongoose';

const DbConnection = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DB_URL as string;
    await mongoose.connect(dbUrl, {
      
    });
    console.log('Database is connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);

  }
};

export default DbConnection;
