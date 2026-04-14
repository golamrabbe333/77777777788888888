import { Router, type IRouter } from "express";
import { ListEmployeesResponse, CreateEmployeeBody } from "@workspace/api-zod";
import { execute, queryRows } from "../lib/mysql";

const router: IRouter = Router();

router.get("/employees", async (_req, res): Promise<void> => {
  const employees = await queryRows("SELECT id, name, role, status, salary, department, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM employees ORDER BY created_at DESC");
  res.json(ListEmployeesResponse.parse(employees));
});

router.post("/employees", async (req, res): Promise<void> => {
  const parsed = CreateEmployeeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const result = await execute("INSERT INTO employees (name, role, status, salary, department) VALUES (?, ?, ?, ?, ?)", [parsed.data.name, parsed.data.role, parsed.data.status || "Present", parsed.data.salary, parsed.data.department || null]);
  const [employee] = await queryRows("SELECT id, name, role, status, salary, department, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM employees WHERE id = ?", [result.insertId]);
  res.status(201).json(employee);
});

export default router;
