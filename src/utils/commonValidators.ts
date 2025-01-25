import { param } from "express-validator";


export const validateId = [
  param("id")
    .isInt()
    .withMessage("Id must be a number")
    .notEmpty()
    .withMessage("Id is required"),
];
