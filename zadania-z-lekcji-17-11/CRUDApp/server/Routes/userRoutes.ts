import express, { Express, Router } from 'express';
import { getUser, createUser } from '../controllers/userControllers';

const router: Router = express.Router();

router.get('/', getUser);
router.post('/addUser', createUser)

export default router;