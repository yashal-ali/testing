import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI as string;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ MongoDB already connected (scient-auth).");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS:30000, // Increase timeout
    });
    console.log("✅ MongoDB Connected Successfully (scient-auth).");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed (scient-auth):", error);
    throw new Error("MongoDB Connection Failed");
  }
};
