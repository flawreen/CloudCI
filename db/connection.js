import {MongoClient, ServerApiVersion} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1, strict: true, deprecationErrors: true,
//     }
// });

export const closeDbConnection = async () => {
    try {
        await client.close();
    } catch (error) {
        console.error('Error closing MongoDB connection:', error.message);
    }
}

let client;
export const connectToDb = async () => {
    try {
        if (client) {
            return client.db(process.env.DB_NAME);
        }
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1, strict: true, deprecationErrors: true,
            }
        });
        await client.connect();
        return client.db(process.env.DB_NAME);
    } catch (err) {
        console.error(err);
    } finally {
    }
}



// export default db;
