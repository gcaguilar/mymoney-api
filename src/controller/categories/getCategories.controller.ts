import categoryService from "../../services/categories/categoryService";
import { Request, Response, NextFunction } from "express";

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await categoryService.getAll("1");
    res.status(200).json({ data: category }).send();
  } catch (error) {
    next(error);
  }
};

export { getCategories };
