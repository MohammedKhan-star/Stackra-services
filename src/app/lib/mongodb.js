import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const globalForMongoose = globalThis;

if (!globalForMongoose.__mongoose) {
  globalForMongoose.__mongoose = {
    conn: null,
    promise: null,
  };
}

const cached = globalForMongoose.__mongoose;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "stackra_portfolio",
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error(
          "❌ MongoDB connection failed:",
          error
        );

        cached.promise = null;

        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}
