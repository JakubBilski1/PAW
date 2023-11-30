import express, { Router } from 'express';
import { updateCategory, removeCategory, getCategory, addCategory } from '../controllers/categoryControllers';

const router: Router = express.Router();

router.get('/:id', getCategory)
router.post('/addCategory', addCategory)
router.delete('/removeCategory/:id', removeCategory)
router.put('/updateCategory/:id', updateCategory)

export default router;