import { Request, Response } from 'express';
import mongoDBConnect from '../services/mongoDBConnect';

const addRandomData = async (req: Request, res: Response) => {
    const db: any | undefined = await mongoDBConnect();
    const collection = db.collection('RandomData');
    const { name, data } = req.body;
    if(!name || !data) return res.status(400).json({error: "Missing required data"});
    try{
        const result = await collection.insertOne({name, data});
        res.status(201).json(result);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { addRandomData };