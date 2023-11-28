import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeUser = async (req: Request, res: Response) => {
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
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                email: req.body.email,
                password: req.body.password
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
    updateUser
};