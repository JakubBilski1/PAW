import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({error: "Missing required data"});
    try {
        const user = await prisma.user.create({
            data: {
                email: email as string,
                password: password as string
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeUser = async (req: Request, res: Response) => {
    if(!req.params.id) return res.status(400).json({error: "Missing required data"});
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!req.params.id || !email || !password) return res.status(400).json({error: "Missing required data"});
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                email: email as string,
                password: password as string
            }
        });
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {
    getUser,
    createUser,
    removeUser,
    updateUser,
    getUsers
};