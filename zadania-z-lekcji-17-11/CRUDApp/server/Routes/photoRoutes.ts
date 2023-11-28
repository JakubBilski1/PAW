import express, { Router } from 'express';
import { updatePhoto, removePhoto } from '../controllers/photoControllers';

const router: Router = express.Router();

router.delete('/removePhoto/:id', removePhoto)
router.put('/updatePhoto/:id', updatePhoto)

export default router;