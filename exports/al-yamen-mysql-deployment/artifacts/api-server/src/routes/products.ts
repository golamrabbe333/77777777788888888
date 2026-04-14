import { Router, type IRouter } from "express";
import { ListProductsResponse, CreateProductBody, DeleteProductParams } from "@workspace/api-zod";
import { execute, queryRows } from "../lib/mysql";

const router: IRouter = Router();

router.get("/products", async (_req, res): Promise<void> => {
  const products = await queryRows("SELECT id, name, category, stock, price, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM products ORDER BY created_at DESC");
  res.json(ListProductsResponse.parse(products));
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const result = await execute("INSERT INTO products (name, category, stock, price) VALUES (?, ?, ?, ?)", [parsed.data.name, parsed.data.category, parsed.data.stock || 0, parsed.data.price]);
  const [product] = await queryRows("SELECT id, name, category, stock, price, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM products WHERE id = ?", [result.insertId]);
  res.status(201).json(product);
});

router.delete("/products/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteProductParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await execute("DELETE FROM products WHERE id = ?", [params.data.id]);
  res.sendStatus(204);
});

export default router;
