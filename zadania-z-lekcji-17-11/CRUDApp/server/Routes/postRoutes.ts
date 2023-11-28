import express, { Router } from 'express';
import { createPost, updatePost, removePost, getPost } from '../controllers/postControllers';

const router: Router = express.Router();

router.get('/:id', getPost);
router.post('/addPost', createPost)
router.delete('/removePost/:id', removePost)
router.put('/updatePost/:id', updatePost)

export default router;