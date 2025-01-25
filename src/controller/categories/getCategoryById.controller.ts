import { param, validationResult } from "express-validator";
import categoryService from "../../services/categories/categoryService";
import { Request, Response, NextFunction } from "express";

const validateGetCategory = [
  param("id")
    .isInt()
    .withMessage("Id must be a number")
    .notEmpty()
    .withMessage("Id is required"),
];

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() }).send();
  }
  const id = Number(req.params.id);

  try {
    const category = await categoryService.getByIdWithMappings(id);
    const data = {
      id: category.id,
      name: category.name,
      associatedKeywords: category.expenseCategoryMapping.map((mapping) => {
        return {
          id: mapping.id,
          name: mapping.name,
        };
      }),
    };

    res.status(200).json({ data }).send();
  } catch (error) {
    next(error);
  }
};

export { getCategoryById, validateGetCategory };
