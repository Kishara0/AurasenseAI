import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../types/graph.js";
import { Response } from "express";

export const sendToken = async (user: User, res: Response, message: string): Promise<void> => {
  const accessToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET_KEY as string,
    //{ expiresIn: "7d" }
  );

  res.status(200).json({
    success: true,
    accessToken,
    message:message
  });
};
