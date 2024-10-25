import express from 'express';
import UserController from '../controllers/user';

const router = express.Router();

type User = {

}

const userController = new UserController();

// Login route
router.post('/login', userController.loginUser);

// Register route
router.post('/register', userController.registerUser);

export default router;