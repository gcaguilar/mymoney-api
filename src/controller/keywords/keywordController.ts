import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import keywordService from "../../services/keyword/keywordService";
import { validateId } from "../../utils/commonValidators";

const validateGetKeyword = [...validateId];

const getById = async (
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
    const keyword = await keywordService.getMappingById(id, "1");
    res.status(200).json({ data: keyword }).send();
  } catch (error) {
    next(error);
  }
};

const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.query.minimal == "true") {
      const keywords = await keywordService.getAllMappingsMinimal("1");
      res.status(200).json({ data: keywords }).send();
    } else {
      const keywords = await keywordService.getAllMappings("1");
      res.status(200).json({ data: keywords }).send();
    }
  } catch (error) {
    next(error);
  }
};

export { getById, validateGetKeyword, getAll };
