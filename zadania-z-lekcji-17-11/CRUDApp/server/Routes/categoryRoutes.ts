import express, { Router } from 'express';
import { updateCategory, removeCategory } from '../controllers/categoryControllers';

const router: Router = express.Router();

router.delete('/removeCategory/:id', removeCategory)
router.put('/updateCategory/:id', updateCategory)

export default router;