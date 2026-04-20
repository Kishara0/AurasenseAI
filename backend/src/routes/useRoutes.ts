import express from 'express';
import { login, create,myDetails,uploadProfileImage } from  '../controllers/userControllers.js'
import authenticateToken from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/signIn',login);
userRouter.post('/signUp',create);
userRouter.get('/me',authenticateToken,myDetails);
userRouter.post('/uploadImage',authenticateToken,uploadProfileImage);

export default userRouter;