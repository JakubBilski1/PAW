import express, { Router } from 'express';
import { getUser, createUser, removeUser, updateUser } from '../controllers/userControllers';

const router: Router = express.Router();

router.get('/', getUser);
router.post('/addUser', createUser)
router.delete('/removeUser/:id', removeUser)
router.put('/updateUser/:id', updateUser)

export default router;