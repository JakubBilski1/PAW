import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getPhoto = async (req: Request, res: Response) => {
    try {
        const photo = await prisma.photo.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        if(!photo) return res.status(404).json({error: "Photo not found"});
        res.send(photo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addPhoto = async (req: Request, res: Response) => {
    try {
        const { url, postId } = req.body;
        if(!url || !postId) return res.status(400).json({error: "Missing required data"});
        const photo = await prisma.photo.create({
            data: {
                url: url as string,
                postId: Number(postId),
            },
        });
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updatePhoto = async (req: Request, res: Response) => {
    try {
        const { url, postId } = req.body;
        const id = req.params.id;
        if(!id || !url || !postId) return res.status(400).json({error: "Missing required data"});
        const photo = await prisma.photo.update({
            where: {
                id: Number(id),
            },
            data: {
                url: url as string,
                postId: Number(postId),
                updatedAt: new Date(),
            },
        });
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removePhoto = async (req: Request, res: Response) => {
    try {
        if(!req.params.id) return res.status(400).json({error: "Missing required data"});
        const photo = await prisma.photo.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { updatePhoto, removePhoto, getPhoto, addPhoto };
