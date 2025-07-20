import { MongoClient } from "mongodb";
import dotenv from "dotenv/config";

export const mongoDbClient = new MongoClient(process.env.MONGO_URI);

export async function connectToMongoDb() {
    try {
        await mongoDbClient.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


