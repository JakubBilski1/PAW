import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id, name } = req.body;
        const category = await prisma.category.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name as string,
            },
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeCategory = async (req: Request, res: Response) => {
    try {
        const category = await prisma.category.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { updateCategory, removeCategory };