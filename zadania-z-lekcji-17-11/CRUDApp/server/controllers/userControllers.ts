import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getUser = (req: Request, res: Response) => {
    res.send('user');
};

const createUser = async(req: Request, res: Response) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password
        }
    }); 
}

export {
    getUser,
    createUser
}