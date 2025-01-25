import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import categoryService from "../../services/categories/categoryService";
import keywordService from "../../services/keyword/keywordService";

const validateCreateCategory = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .escape(),
  // body("associatedKeywords")
  //   .isArray()
  //   .withMessage("Associated keywords must be an array")
  //   .optional()
  //   .custom((value) => {
  //     value.forEach((item: string) => {
  //       if (typeof item !== "string" || item.trim() === "") {
  //         throw new Error("Each associated keyword must be a non-empty string");
  //       }
  //     });
  //     return true;
  //   }),
];

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() }).send();
  }
  const { name, associatedKeywords } = req.body;

  const associatedKeywordsIds = associatedKeywords.map(
    (keyword: { id: number; name: string }) => keyword.id
  );

  try {
    const { id } = await categoryService.addCategory(name);
    await keywordService.update(id, 1, associatedKeywordsIds);
    res.status(200).json({ message: "Category updated successfully" }).send();
  } catch (error) {
    next(error);
  }
};
export { createCategory, validateCreateCategory };
