import express, { Router } from 'express';
import { updateCategory, removeCategory, getCategory, addCategory } from '../controllers/categoryControllers';

const router: Router = express.Router();

router.get('/:id', getCategory)
router.post('/', addCategory)
router.delete('/:id', removeCategory)
router.put('/:id', updateCategory)

export default router;