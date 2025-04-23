import {MongoClient, ServerApiVersion} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, strict: true, deprecationErrors: true,
    }
});

export const connectToDb = async () => {
    try {
        await client.connect();
        return client.db(process.env.DB_NAME);
    } catch (err) {
        console.error(err);
    } finally {
    }
}


// export default db;
