import { Router, type IRouter } from "express";
import { ListCustomersResponse, CreateCustomerBody } from "@workspace/api-zod";
import { execute, queryRows } from "../lib/mysql";

const router: IRouter = Router();

router.get("/customers", async (_req, res): Promise<void> => {
  const customers = await queryRows("SELECT id, name, company, phone, last_order AS lastOrder, total_spent AS totalSpent, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM customers ORDER BY created_at DESC");
  res.json(ListCustomersResponse.parse(customers));
});

router.post("/customers", async (req, res): Promise<void> => {
  const parsed = CreateCustomerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const result = await execute("INSERT INTO customers (name, company, phone, last_order, total_spent) VALUES (?, ?, ?, ?, ?)", [parsed.data.name, parsed.data.company, parsed.data.phone, parsed.data.lastOrder || null, parsed.data.totalSpent || 0]);
  const [customer] = await queryRows("SELECT id, name, company, phone, last_order AS lastOrder, total_spent AS totalSpent, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM customers WHERE id = ?", [result.insertId]);
  res.status(201).json(customer);
});

export default router;
