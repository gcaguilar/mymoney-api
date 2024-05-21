import { Response, Request } from "express";
import keywordService from "./keywordService";
import handleResponse from "../utils/handlePromise";

const getKeywords = async (req: Request, res: Response) => {
  return await handleResponse(keywordService.getKeywords(), res);
};

const getKeywordById = async (req: Request, res: Response) => {
  if (!req.body.id) {
    return res.json({ status: 400 });
  }

  return await handleResponse(keywordService.getKeywordById(req.body.id), res);
};

const addKeyword = async (req: Request, res: Response) => {
  if (!req) {
    return res.json({ status: 400 });
  }

  const { name, associtesNames, categoryId } = req.body.data;

  return await handleResponse(
    keywordService.addKeyword(associtesNames, categoryId),
    res
  );
};

const deleteKeyword = async (req: Request, res: Response) => {
  if (!req.body.id) {
    return res.json({ status: 400 });
  }

  return await handleResponse(keywordService.deleteKeyword(req.body.id), res);
};

const updateKeyword = async (req: Request, res: Response) => {
  if (!req) {
    return res.json({ status: 500 });
  }

  const { id, name, associtesNames, categoryId } = req.body.data;

  if (!id || !name || !associtesNames || !categoryId) {
    return res.json({ status: 400 });
  }

  return await handleResponse(
    keywordService.updateKeyword(id, name, associtesNames, categoryId),
    res
  );
};

const keywordController = {
  getKeywords,
  getKeywordById,
  addKeyword,
  deleteKeyword,
  updateKeyword,
};
export default keywordController;
