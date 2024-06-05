import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.MONGO_URI);

export async function connectMongo(): Promise<void> {
  await mongoClient.connect();
  console.log("Connected to MongoDB");
}
