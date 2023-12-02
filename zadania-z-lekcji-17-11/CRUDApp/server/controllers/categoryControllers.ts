import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCategory = async (req: Request, res: Response) => {
    if(!req.params.id) return res.status(400).json({error: "Missing required data"});
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        category ? res.status(200).json(category) : res.status(404).json({ error: 'Category not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if(!name || !req.body.postId) return res.status(400).json({error: "Missing required data"});
        const postId = await prisma.post.findUnique({
            where: {
                id: Number(req.body.postId),
            },
        });
        if(postId){
            const category = await prisma.category.create({
                data: {
                    name: name as string,
                },
            });
            const categoryId = category.id;
            const relateWithPost = await prisma.postCategory.create({
                data: {
                    postId: Number(req.body.postId),
                    categoryId: Number(categoryId),
                },
            });
            res.status(200).json(category);
        }else{
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name, postId } = req.body;
        const id = req.params.id;
        if(!id || !name) return res.status(400).json({error: "Missing required data"});
        const category = await prisma.category.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name as string,
            },
        });
        const updatePostId = await prisma.postCategory.update({
            where: {
                id: Number(id)
            },
            data: {
                postId: Number(postId)
            },
        });
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeCategory = async (req: Request, res: Response) => {
    try {
        if(!req.params.id) return res.status(400).json({error: "Missing required data"});
        const category = await prisma.category.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { updateCategory, removeCategory, getCategory, addCategory };