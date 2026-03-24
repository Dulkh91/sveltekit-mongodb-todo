import { MongoClient,Db } from "mongodb";
import {MONGODB_URL, DB_NAME} from '$env/static/private'

let client: MongoClient
let db: Db

// const client = new MongoClient(MONGODB_URL)

export async function connectToDatabase() {
    if(!client){
        const client = new MongoClient(MONGODB_URL)
        await client.connect()
        // console.log('✅ Connected to MongoDB Atlas');
        db = client.db(DB_NAME)
    }

    return db
}

export function getDB(){
    if(!db){
        throw new Error('Database not connected. Call connectToDatabase first.');
    }
    return db
}
