import { Router, type IRouter } from "express";
import { ListCategoriesResponse } from "@workspace/api-zod";
import { queryRows } from "../lib/mysql";

const router: IRouter = Router();

router.get("/categories", async (_req, res): Promise<void> => {
  const categories = await queryRows("SELECT category AS name, COUNT(*) AS count FROM products GROUP BY category");
  res.json(ListCategoriesResponse.parse(categories));
});

export default router;
