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
    const { email, password } = req.body ?? {};
    
    if (!email || !password) {
        return res.status(400).json({error: "Email and password are required"})
    }
    const normalizedEmail= email.trim().toLowerCase()
    try {
        const user = await prisma.user.findUnique({ where: { email:normalizedEmail } });
        if (!user) {
        return res.status(400).json({error:"Invalid credentials"})    
        }
         if (!user.password) {
      return res.status(400).json({ error: "This account uses Google login. Please sign in with Google." });
    }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({error:"Invalid credentials"})
        }
        const token = jwt.sign({
            userId: user.id,email: normalizedEmail
        }, JWT_SECRET, { expiresIn: "1h" })
        const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax${secure}`
    );
     res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}