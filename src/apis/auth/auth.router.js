import express from 'express';
import authController from './auth.controller';
import verifyMiddleware from '../../middleware/verify.middleware';

const route = express.Router();

route.get('/me', verifyMiddleware.checkAuth, authController.getMe);
route.post('/register', authController.register);
route.post('/login', authController.login);

export default route;