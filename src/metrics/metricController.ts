import { Response } from "express";
import sumatoryService from "./sumatoryService";

function getMetrics(res: Response) {
  return Promise.all([
    sumatoryService.getSumExpenseByMonth(),
    sumatoryService.getSumExpenseByCategory(),
  ])
    .then(async ([totalByMonth, totalByCategory]) => {
      return res.json({
        data: {
          totalByMonth,
          totalByCategory,
        },
      });
    })
    .catch((error: Error) => {
      res.json({ status: 500 });
    });
}

const metricController = { getMetrics };
export default metricController;
