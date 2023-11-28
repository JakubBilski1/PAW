import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: Number(req.params.id)
            }
        });
        if (userProfile) {
            res.status(200).json(userProfile);
        } else {
            res.status(404).json({ error: 'User profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUserProfile = async (req: Request, res: Response) => {
    try {
        const userProfile = await prisma.userProfile.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nickName: req.body.nickName,
                city: req.body.city,
                country: req.body.country,
                dob: req.body.dob,
                userId: Number(req.body.userId)
            }
        });
        res.status(201).json(userProfile);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userProfile = await prisma.userProfile.update({
            where: {
                userId: Number(req.params.id)
            },
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nickName: req.body.nickName,
                city: req.body.city,
                country: req.body.country,
                dob: req.body.dob,
                updatedAt: new Date()
            }
        });
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeUserProfile = async (req: Request, res: Response) => {
    try {
        const userProfile = await prisma.userProfile.delete({
            where: {
                userId: Number(req.params.id)
            }
        });
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    removeUserProfile
};
