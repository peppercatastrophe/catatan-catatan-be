import { PrismaClient } from "@prisma/client";  

const prisma = new PrismaClient();


export interface UserType {
    id: number;
    email: string;
    password: string;
    name: string;
} 


export default class User {
    // login method getting user by email and password
    static async login(email: string, password: string): Promise<UserType> {
        try {
            const user = await prisma.user.findUnique({ where: { email, password } });
            if (!user) {
                throw new Error("Invalid email or password");
            }
            return user
        } catch (error) {
            throw error;
        }
    }

    // register method creating a new user
    static async register(email: string, password: string, name: string): Promise<UserType> {
        try {
            const user = await prisma.user.create({ data: { email, password, name } });
            return user
        } catch (error) {
            throw error;
        }
    }

    // find user by email
    static async findByEmail(email: string): Promise<UserType | null> {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    
    }
}