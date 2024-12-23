import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

// registration user
router.post('/auht/register', authController.register);

export default router;
