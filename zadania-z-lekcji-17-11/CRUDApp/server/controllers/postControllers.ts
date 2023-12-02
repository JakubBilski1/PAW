import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getPost = async (req: Request, res: Response) => {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: Number(req.params.id),
        },
        include: {
          user: true,
          categories: {
            include: {
              category: true,
            },
          },
          photo: true,
        },
      });
      if(!post) return res.status(404).json({error: "Post not found"});
        res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };  

const createPost = async (req: Request, res: Response) => {
    const { userId, title, content, published, categories, photos } = req.body;
    if(!userId || !title || !content || !published || !categories || !photos) return res.status(400).json({error: "Missing data"});
    try{
        const post = await prisma.post.create({
            data: {
                userId: Number(userId),
                title: (title as string),
                content: (content as string),
                published: (published as boolean),
            },
        });
        const createdCategories = await Promise.all(
            categories.map(async (category: string) => {
                const createdCategory = await prisma.category.create({
                    data: {
                        name: category,
                    },
                });
                
                return prisma.postCategory.create({
                    data: {
                        categoryId: createdCategory.id,
                        postId: post.id,
                    },
                });
            })
        )
        const createdPhotos = await Promise.all(
            photos.map(async (photo: string) => {
                const createdPhoto = await prisma.photo.create({
                    data: {
                        url: photo,
                        postId: post.id,
                    },
                });
                return createdPhoto;
            })
        );
        res.send({
            post,
            categories: createdCategories,
            photos: createdPhotos
        });
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const removePost = async (req: Request, res: Response) => {
    try{
        const post = await prisma.post.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.send(post);
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const updatePost = async (req: Request, res: Response) => {
    const { userId, title, content, published } = req.body;
    if(!userId || !title || !content || !published) return res.status(400).json({error: "Missing data"});
    try{
        const post = await prisma.post.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                userId: Number(userId),
                title: (title as string),
                content: (content as string),
                published: (published as boolean),
                updatedAt: new Date()
            },
        });
        res.send(post);
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export { getPost, createPost, removePost, updatePost };