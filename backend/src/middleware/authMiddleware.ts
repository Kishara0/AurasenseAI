import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma.js";

const authenticateToken = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const accessToken = req.headers["authorization"];

    if (accessToken && accessToken.startsWith("Bearer ")) {
      const token = accessToken.slice(7);

      const userData = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string,
      ) as { id: string };

      const user = await prisma.user.findUnique({
        where: {
          id: userData.id,
        },
        include: {
          cars: true,
        },
      });

      if (!user) {
        res.status(401).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      req.user = user;
      next();
      return;
    }

    res.status(401).json({
      success: false,
      message: "Authentication token is missing or invalid.",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
};

export default authenticateToken;
