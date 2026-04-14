import { Router, type IRouter } from "express";
import { ListOrdersResponse, CreateOrderBody } from "@workspace/api-zod";
import { execute, queryRows } from "../lib/mysql";

const router: IRouter = Router();

router.get("/orders", async (_req, res): Promise<void> => {
  const orders = await queryRows("SELECT id, order_id AS orderId, customer, date, total, status, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM orders ORDER BY created_at DESC");
  res.json(ListOrdersResponse.parse(orders));
});

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
  const result = await execute("INSERT INTO orders (order_id, customer, date, total, status) VALUES (?, ?, ?, ?, ?)", [orderId, parsed.data.customer, parsed.data.date, parsed.data.total, parsed.data.status || "Completed"]);
  const [order] = await queryRows("SELECT id, order_id AS orderId, customer, date, total, status, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM orders WHERE id = ?", [result.insertId]);
  res.status(201).json(order);
});

export default router;
