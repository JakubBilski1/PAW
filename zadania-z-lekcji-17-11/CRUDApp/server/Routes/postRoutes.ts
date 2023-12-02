import express, { Router } from 'express';
import { createPost, updatePost, removePost, getPost } from '../controllers/postControllers';

const router: Router = express.Router();

router.get('/:id', getPost);
router.post('/', createPost)
router.delete('/:id', removePost)
router.put('/:id', updatePost)

export default router;