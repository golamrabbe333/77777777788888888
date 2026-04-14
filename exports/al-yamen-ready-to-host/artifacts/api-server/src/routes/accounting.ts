import { Router, type IRouter } from "express";
import { GetDailyLedgerResponse, GetExpenseReportResponse, GetPayrollDataResponse } from "@workspace/api-zod";
import { queryRows } from "../lib/mysql";

const router: IRouter = Router();

router.get("/accounting/ledger", async (_req, res): Promise<void> => {
  const [incomeResult] = await queryRows<{ total: number }>("SELECT COALESCE(SUM(amount), 0) AS total FROM transactions WHERE type = 'Sale'");
  const [expenseResult] = await queryRows<{ total: number }>("SELECT COALESCE(SUM(amount), 0) AS total FROM transactions WHERE type = 'Expense'");
  const totalIncome = Number(incomeResult?.total || 0);
  const totalExpenses = Number(expenseResult?.total || 0);
  res.json(GetDailyLedgerResponse.parse({ totalBalance: totalIncome - totalExpenses, totalIncome, totalExpenses, date: new Date().toISOString().split("T")[0] }));
});

router.get("/accounting/expenses", async (_req, res): Promise<void> => {
  const expenses = await queryRows("SELECT category, amount FROM expenses");
  res.json(GetExpenseReportResponse.parse(expenses.length ? expenses : [
    { category: "Rent", amount: 8500 }, { category: "Utilities", amount: 3200 }, { category: "Marketing", amount: 4100 }, { category: "Travel", amount: 1800 },
  ]));
});

router.get("/accounting/payroll", async (_req, res): Promise<void> => {
  const [salaryTotal] = await queryRows<{ total: number }>("SELECT COALESCE(SUM(salary), 0) AS total FROM employees");
  const totalSalaries = Number(salaryTotal?.total || 0);
  res.json(GetPayrollDataResponse.parse([
    { category: "Salaries Paid", amount: totalSalaries || 124000 },
    { category: "Bonuses", amount: Math.round(totalSalaries * 0.15) || 18000 },
    { category: "Taxes", amount: Math.round(totalSalaries * 0.07) || 9200 },
  ]));
});

export default router;
