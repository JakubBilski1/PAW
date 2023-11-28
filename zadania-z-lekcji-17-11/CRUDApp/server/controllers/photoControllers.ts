import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updatePhoto = async (req: Request, res: Response) => {
    try {
        const { id, url, postId } = req.body;
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

export { updatePhoto, removePhoto };
