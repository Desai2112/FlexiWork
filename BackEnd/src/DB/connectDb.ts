import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionString = `${process.env.MONGODB_URL}/${process.env.DB_NAME}`;
    const connectionInstance = await mongoose.connect(connectionString);
    console.log(
      `\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MongoDB connection Error ", error);
    process.exit(1);
  }
};

export { connectDB };
