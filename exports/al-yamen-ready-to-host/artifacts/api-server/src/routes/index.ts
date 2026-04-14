import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import transactionsRouter from "./transactions";
import ordersRouter from "./orders";
import customersRouter from "./customers";
import productsRouter from "./products";
import employeesRouter from "./employees";
import dashboardRouter from "./dashboard";
import accountingRouter from "./accounting";
import categoriesRouter from "./categories";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(transactionsRouter);
router.use(ordersRouter);
router.use(customersRouter);
router.use(productsRouter);
router.use(employeesRouter);
router.use(dashboardRouter);
router.use(accountingRouter);
router.use(categoriesRouter);

export default router;
