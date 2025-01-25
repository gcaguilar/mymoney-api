import express from "express";
import { validateGetKeyword, getById, getAll } from "../controller/keywords/keywordController";

const router = express.Router();

router.get("/keywords", getAll);
router.get("/keywords/:id", validateGetKeyword, getById);
router.post("/keywords");
router.delete("/keywords/:id");

export default router;
