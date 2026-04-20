import prisma from "../utils/prisma.js";
import "dotenv/config";
import { Request, Response } from "express";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { data } = req.body;
    await prisma.cars.create({
      data: {
        userId: userId,
        make: data.make,
        model: data.model,
        year: Number(data.year),
        mileage: Number(data.mileage),
      },
    });
    res.status(201).json({
      success: true,
      message: "Vehicles add successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getVehicle = async (req: Request, res: Response) => {
  try {
    const cars = await prisma.cars.findMany({
      where: { isDiagnostic: false },
    });
    res.status(200).json({
      success: true,
      message: "All the cars return",
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { createVehicle, getVehicle };
