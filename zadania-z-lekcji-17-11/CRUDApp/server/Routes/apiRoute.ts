import express, { Router } from 'express';
import { addRandomData } from '../controllers/randomDataControllers';

const router: Router = express.Router();

router.post('/', addRandomData)

export default router;