import { response, Request, Response } from "express";
import handleResponse from "../utils/handlePromise";
import categoryService from "./categoryService";

const addCategory = async (req: Request, res: Response) => {
  if (!req) {
    throw new Error("Request is required");
  }

  const { name, associatesNames } = req.body.data;
  const matchingName = associatesNames
    .map((x: string) => x.toString())
    .join(", ");
  return await handleResponse(
    categoryService.addCategory(name, associatesNames),
    res
  );
};

const remove = async (req: Request, res: Response) => {
  if (!req.body.id) {
    response.json({ status: 400 });
  }

  return await handleResponse(categoryService.deleteById(req.body.id), res);
};

const update = async (req: Request, res: Response) => {
  if (!req) {
    response.json({ status: 400 });
  }

  const { id, name } = req.body;

  return await handleResponse(categoryService.update(id, name), res);
};

const getAll = async (req: Request, res: Response) => {
  const categories = await categoryService.getAll();
  const data = categories.map((category) => {
    const { expenseNames: associatesNames } =
      category.expenseCategoryMapping[0];
    const { updatedAt, createdAt, deleted, userId, expenseCategoryMapping, ...rest } = category;
    return { ...rest, associatesNames };
  });
  res.json({ data });
};

const getById = async (req: Request, res: Response) => {
  if (!req.body.id) {
    response.json({ status: 400 });
  }

  return await handleResponse(categoryService.getById(req.body.id), res);
};

const categoryController = { addCategory, remove, update, getAll, getById };
export default categoryController;
