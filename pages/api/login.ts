import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




const JWT_SECRET = process.env.JWT_SECRET


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({error:"Method is not allowed"})
    }
    
    if (!JWT_SECRET) {
        return res.status(500).json({error:"JWT_SECRET is not set"})
        
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({error: "Email and password are required"})
    }
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
        return res.status(400).json({error:"Invalid credentials"})    
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({error:"Invalid credentials"})
        }
        const token = jwt.sign({
            userId: user.id,email: user.email
        }, JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({message:"login successful", token})
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json({error:"Something went wrong"})
    }
}