import express from 'express';
import { signup, login, checkAuth, updateProfile } from '../controllers/userController.js';
import { protectRoute } from '../middleware/auth.js'; // FIXED

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/update-profile', protectRoute, updateProfile);
userRouter.get('/check', protectRoute, checkAuth);

export default userRouter;
