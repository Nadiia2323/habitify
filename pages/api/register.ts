import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({message:"Method not allowed"})
    }

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({message:"Missing email or password"})
    }

    

  try {
    const normalizedEmail = email.trim().toLowerCase()


    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (existingUser) {
      return res.status(400).json({message:"User already exists"})
      
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created", user:{id: user.id , email: user.email} });
  } catch (error) {
   console.log('error :>> ', error);

    console.error("DB error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
    }
