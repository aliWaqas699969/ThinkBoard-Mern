import mangoose from "mongoose";
export const connectDb = async () => {
  try {
    await mangoose.connect(process.env.MANGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected");
  }
};
