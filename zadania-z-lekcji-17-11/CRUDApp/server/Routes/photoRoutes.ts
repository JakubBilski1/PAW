import express, { Router } from 'express';
import { updatePhoto, removePhoto, getPhoto, addPhoto } from '../controllers/photoControllers';

const router: Router = express.Router();

router.get('/:id', getPhoto)
router.post('/', addPhoto)
router.delete('/:id', removePhoto)
router.put('/:id', updatePhoto)

export default router;