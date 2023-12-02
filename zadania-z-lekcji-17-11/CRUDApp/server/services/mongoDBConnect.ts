import { MongoClient } from 'mongodb';
const dbName = "crudApp";

const uri: string | undefined = process.env.MONGO_URI;

if(!uri){
    console.error("Missing MONGO_DB_URI env variable");
    process.exit(1);
}

const mongoDBConnect = async () => {
    try {
        const db = await MongoClient.connect(uri)
        return db.db(dbName);
    }catch(error){
        console.error(error);
    }
}

export default mongoDBConnect;