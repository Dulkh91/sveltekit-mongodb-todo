import { MongoClient } from "mongodb";
import {MONGODB_URL, DB_NAME} from '$env/static/private'

const client = new MongoClient(MONGODB_URL)

export async function connectToDatabase() {
    try {
        await client.connect()
        // console.log("Success Connected!")
        return client.db(DB_NAME)
    } catch (error) {
        console.error("Mongodb connection error: ", error)
        throw error
    }
}

// បន្ថែម function getDb នេះ!
// export async function getDb() {
//     if (!dbInstance) {
//         // បើមិនទាន់មាន connection សូមភ្ជាប់
//         await connectToDatabase()
//     }
//     return dbInstance
// }

export const db = client.db(DB_NAME)
