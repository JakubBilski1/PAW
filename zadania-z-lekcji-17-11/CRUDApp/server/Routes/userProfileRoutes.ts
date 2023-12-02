import express, { Router } from 'express';
import { getUserProfile, createUserProfile, removeUserProfile, updateUserProfile } from '../controllers/userProfileControllers';

const router: Router = express.Router();

router.get('/:id', getUserProfile);
router.post('/', createUserProfile)
router.delete('/:id', removeUserProfile)
router.put('/:id', updateUserProfile)

export default router;