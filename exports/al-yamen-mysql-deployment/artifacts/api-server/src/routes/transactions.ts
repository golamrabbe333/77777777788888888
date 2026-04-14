import { Router, type IRouter } from "express";
import {
  ListTransactionsQueryParams,
  ListTransactionsResponse,
  CreateTransactionBody,
  DeleteTransactionParams,
} from "@workspace/api-zod";
import { execute, queryRows } from "../lib/mysql";

const router: IRouter = Router();

router.get("/transactions", async (req, res): Promise<void> => {
  const params = ListTransactionsQueryParams.safeParse(req.query);
  const values: unknown[] = [];
  let where = "";

  if (params.success && params.data.search) {
    where = "WHERE customer LIKE ? OR description LIKE ?";
    const search = "%" + params.data.search + "%";
    values.push(search, search);
  }

  const limit = params.success && params.data.limit ? params.data.limit : 100;
  values.push(limit);

  const transactions = await queryRows(
    "SELECT id, date, type, customer, description, amount, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM transactions " + where + " ORDER BY created_at DESC LIMIT ?",
    values,
  );

  res.json(ListTransactionsResponse.parse(transactions));
});

router.post("/transactions", async (req, res): Promise<void> => {
  const parsed = CreateTransactionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const result = await execute(
    "INSERT INTO transactions (date, type, customer, description, amount) VALUES (?, ?, ?, ?, ?)",
    [parsed.data.date, parsed.data.type, parsed.data.customer, parsed.data.description, parsed.data.amount],
  );
  const [transaction] = await queryRows("SELECT id, date, type, customer, description, amount, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM transactions WHERE id = ?", [result.insertId]);
  res.status(201).json(transaction);
});

router.delete("/transactions/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteTransactionParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await execute("DELETE FROM transactions WHERE id = ?", [params.data.id]);
  res.sendStatus(204);
});

export default router;
