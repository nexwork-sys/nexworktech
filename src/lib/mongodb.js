import mongoose from "mongoose";

const cached = globalThis._nexMongoose || (globalThis._nexMongoose = { conn: null, promise: null });

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI .env.local mein set nahi hai");
  }
  if (cached.conn) return cached.conn;
  cached.promise ||= mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
