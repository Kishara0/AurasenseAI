import prisma from "../utils/prisma.js";
import "dotenv/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { LoginProps, User } from "../types/graph.js";
import { sendToken } from "../utils/sendToken.js";
import * as bcrypt from "bcryptjs";
import { Provider } from "@prisma/client";
import sendMail from "../utils/nodeMailer.js";
import {
  createAccountTemplate,
  loginTemplate,
} from "../utils/emailTemplate.js";
import cloudinary from "../utils/cloudinary.js";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { signToken } = req.body;

    if (!signToken) {
      res.status(400).json({
        success: false,
        message: "Login details are required",
      });
      return;
    }

    const data = jwt.verify(
      signToken,
      process.env.JWT_SECRET_KEY as string,
    ) as LoginProps;

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!existingUser) {
      if (data.provider !== Provider.Local) {
        const user = await prisma.user.create({
          data: {
            userName: data.userName,
            email: data.email,
            avatar: data.avatar ?? null,
            provider: data.provider,
          },
        });

        await sendToken(user, res, "User Login Successful");
        await sendMail(
          user.email,
          "User Login Successful",
          loginTemplate(user.userName),
        );
        return;
      }

      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (data.provider === Provider.Local) {
      if (!data.password) {
        res.status(400).json({
          success: false,
          message: "Password is required",
        });
        return;
      }

      if (!existingUser.password) {
        res.status(400).json({
          success: false,
          message: "Password not set",
        });
        return;
      }

      const isMatchPassword = await bcrypt.compare(
        data.password,
        existingUser.password,
      );

      if (!isMatchPassword) {
        res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
        return;
      }
    }

    await sendToken(existingUser, res, "User Login Successful");
    await sendMail(
      existingUser.email,
      "User Login Successful",
      loginTemplate(existingUser.userName),
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { signUpToken } = req.body;

    if (!signUpToken) {
      res.status(400).json({
        success: false,
        message: "Signup details are required",
      });
      return;
    }

    const data = jwt.verify(
      signUpToken,
      process.env.JWT_SECRET_KEY as string,
    ) as LoginProps;

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    if (data.provider !== Provider.Local) {
      const user = await prisma.user.create({
        data: {
          userName: data.userName,
          email: data.email,
          avatar: data.avatar ?? null,
          provider: data.provider,
        },
      });

      await sendToken(user, res, "User Created Successfully");
      await sendMail(
        user.email,
        "Thank you creating the account",
        createAccountTemplate(user.userName),
      );
      return;
    }

    if (!data.password) {
      res.status(400).json({
        success: false,
        message: "Password is required",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        userName: data.userName,
        email: data.email,
        avatar: data.avatar ?? null,
        password: hashPassword,
        provider: Provider.Local,
      },
    });

    await sendToken(user, res, "User Created Successfully");
    await sendMail(
      user.email,
      "Thank you creating the account",
      createAccountTemplate(user.userName),
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User creation failed",
    });
  }
};

const myDetails = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User creation failed",
    });
  }
};

const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { image } = req.body;
    console.log(image)
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const oldImage = user.avatar;
    if (
      oldImage &&
      oldImage.includes("https://res.cloudinary.com") &&
      oldImage !== image
    ) {
      try {
        const parts = oldImage.split("/");
        const fileWithExt = parts.pop();

        if (!fileWithExt) 
          return;
        const publicId = fileWithExt.split(".")[0];

        console.log("Deleting image:", publicId);

        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary delete result:", result);
      } catch (err) {
        console.log("Cloudinary delete failed:", err);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        avatar: image,
      },
    });
    res.status(200).json({
      success: true,
      message: "Profile image updated",
      avatar: updatedUser?.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User creation failed",
    });
  }
};

export { login, create, myDetails, uploadProfileImage };
