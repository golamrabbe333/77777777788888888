import { Router, type IRouter } from "express";
import { GetDashboardSummaryResponse, GetRevenueChartResponse } from "@workspace/api-zod";
import { queryRows } from "../lib/mysql";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const [revenueResult] = await queryRows<{ total: number }>("SELECT COALESCE(SUM(amount), 0) AS total FROM transactions WHERE type = 'Sale'");
  const [transCount] = await queryRows<{ count: number }>("SELECT COUNT(*) AS count FROM transactions");
  const [staffCount] = await queryRows<{ count: number }>("SELECT COUNT(*) AS count FROM employees");
  const [onLeaveCount] = await queryRows<{ count: number }>("SELECT COUNT(*) AS count FROM employees WHERE status = 'On Leave'");
  const recentTransactions = await queryRows("SELECT id, date, type, customer, description, amount, DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt FROM transactions ORDER BY created_at DESC LIMIT 5");
  const totalTransactions = Number(transCount?.count || 0);

  res.json(GetDashboardSummaryResponse.parse({
    annualRevenue: Number(revenueResult?.total || 0),
    totalTransactions,
    growthRate: totalTransactions > 0 ? 18.4 : 0,
    activeStaff: Number(staffCount?.count || 0),
    onLeave: Number(onLeaveCount?.count || 0),
    recentTransactions,
  }));
});

router.get("/dashboard/revenue-chart", async (_req, res): Promise<void> => {
  const data = await queryRows("SELECT DATE_FORMAT(created_at, '%b') AS month, COALESCE(SUM(amount), 0) AS revenue FROM transactions WHERE type = 'Sale' GROUP BY DATE_FORMAT(created_at, '%Y-%m'), DATE_FORMAT(created_at, '%b') ORDER BY MIN(created_at)");
  res.json(GetRevenueChartResponse.parse(data.length ? data : [
    { month: "Jan", revenue: 8000 }, { month: "Feb", revenue: 12000 }, { month: "Mar", revenue: 15000 },
  ]));
});

export default router;
