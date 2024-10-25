// express + typescript controller dealing with user registration and login

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export default class UserController {
    private static SECRET_KEY = process.env.JWT_SECRET_KEY;
    private static EXPIRATION_TIME = '1h';
    private router = express.Router();

    constructor() {
        this.routes();
    }

    private routes(): void {
        this.router.post('/register', this.registerUser);
        this.router.post('/login', this.loginUser);
    }

    public registerUser = async (req: express.Request, res: express.Response) => {
        try {
            const { email, password, name } = req.body;

            // Check if email already exists
            const existingUser = await User.findByEmail( email  );
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.register( email, hashedPassword, name );
            type response = {
                email: string
                name: string
            }
            const response:response = {
                email: user.email,
                name: user.name,
            }
            res.json({ message: 'User registered successfully', response });
        } catch (error) {
            res.status(500).json({ error });
        }
    };

    public loginUser = async (req: express.Request, res: express.Response) => {
        try {
            const { email, password } = req.body;

            // Check if email exists
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Compare hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            // Generate JWT token
            const jwtSecret : string = UserController.SECRET_KEY ?? '';
            const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: UserController.EXPIRATION_TIME });
            res.json({ message: 'User logged in successfully', token });
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    public getRouter(): express.Router {
        return this.router;
    }
}

