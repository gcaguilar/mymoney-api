import { Response } from "express";

export default async function handleResponse(promise: Promise<any>, res: Response) {
  try {
    const result = await promise;
    console.log("Success");
    return res.json({ data: result });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.json({ status: 500 });
  }
}
