
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    
  let payload: JwtPayload | string;
try {
    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
   
} catch (error) {
    console.log('error :>> ', error);
  return res.status(401).json({ error: "Invalid or expired token" });
}

    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, createdAt: true }, 
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("API /me error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}


