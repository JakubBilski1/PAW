import express, { Router } from 'express';
import { getUser, createUser, removeUser, updateUser, getUsers } from '../controllers/userControllers';

const router: Router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser)
router.delete('/:id', removeUser)
router.put('/:id', updateUser)

export default router;