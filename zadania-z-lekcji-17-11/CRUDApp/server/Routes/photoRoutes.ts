import express, { Router } from 'express';
import { updatePhoto, removePhoto, getPhoto, addPhoto } from '../controllers/photoControllers';

const router: Router = express.Router();

router.get('/:id', getPhoto)
router.post('/addPhoto', addPhoto)
router.delete('/removePhoto/:id', removePhoto)
router.put('/updatePhoto/:id', updatePhoto)

export default router;