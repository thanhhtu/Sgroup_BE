import express from 'express';
import usersRoute from './users/users.router';
import authRoute from './auth/auth.router';
import filesRoute from './upload/upload.router';

const router = express.Router();

router.use('/users', usersRoute);
router.use('/auth', authRoute);
router.use('/upload', filesRoute);

export default router;