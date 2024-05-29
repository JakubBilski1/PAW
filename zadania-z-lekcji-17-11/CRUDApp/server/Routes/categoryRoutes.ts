import express, { Router } from 'express';
import { updateCategory, removeCategory, getCategories, addCategory } from '../controllers/categoryControllers';

const router: Router = express.Router();

router.get('/', getCategories)
router.post('/:id', addCategory)
router.delete('/:id', removeCategory)
router.put('/:id', updateCategory)

export default router;