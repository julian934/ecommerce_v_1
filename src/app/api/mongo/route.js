import { MongoClient } from "mongodb";

export async function GET(request){
    const mongo=MongoClient(process.env.NEXT_PUBLIC_MONGO_SECRET_KEY)
    return  mongo.json()

}