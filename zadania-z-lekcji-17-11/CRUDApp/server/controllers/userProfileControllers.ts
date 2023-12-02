import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getUserProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: "Missing required data"});
        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: Number(id)
            }
        });
        if (userProfile) {
            res.status(200).json(userProfile);
        } else {
            res.status(404).json({ error: 'User profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUserProfile = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, nickName, city, country, dob, userId } = req.body;
        if(!firstName || !lastName || !nickName || !city || !country || !dob || !userId) return res.status(400).json({error: "Missing required data"});
        const userProfile = await prisma.userProfile.create({
            data: {
                firstName: firstName as string,
                lastName: lastName as string,
                nickName: nickName as string,
                city: city as string,
                country: country as string,
                dob: new Date(dob) as Date,
                userId: Number(userId),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        res.status(201).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, nickName, city, country, dob } = req.body;
        if(!firstName || !lastName || !nickName || !city || !country || !dob) return res.status(400).json({error: "Missing required data"});
        const id = req.params.id;
        const userProfile = await prisma.userProfile.update({
            where: {
                userId: Number(id)
            },
            data: {
                firstName: firstName as string,
                lastName: lastName as string,
                nickName: nickName as string,
                city: city as string,
                country: country as string,
                dob: new Date(dob) as Date,
                updatedAt: new Date()
            }
        });
        res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeUserProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: "Missing required data"});
        const userProfile = await prisma.userProfile.delete({
            where: {
                userId: Number(id)
            }
        });
        res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    removeUserProfile
};
