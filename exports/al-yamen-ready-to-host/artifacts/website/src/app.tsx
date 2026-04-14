import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import NotFound from "@/pages/not-found";

import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import TransactionsList from "@/pages/transactions/index";
import AddTransaction from "@/pages/transactions/add";
import RecentTransactions from "@/pages/transactions/recent";
import NewOrder from "@/pages/orders/new";
import OrderHistory from "@/pages/orders/history";
import Customers from "@/pages/customers";
import AddProduct from "@/pages/products/add";
import StockList from "@/pages/products/stock";
import Categories from "@/pages/products/categories";
import Employees from "@/pages/employees";
import Payroll from "@/pages/payroll";
import Attendance from "@/pages/attendance";
import DailyLedger from "@/pages/accounting/ledger";
import ExpenseReport from "@/pages/accounting/expenses";
import SystemConfig from "@/pages/settings/index";
import UserRoles from "@/pages/settings/roles";
import Layout from "@/components/layout";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/:rest*">
        <Layout>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/transactions" component={TransactionsList} />
            <Route path="/transactions/add" component={AddTransaction} />
            <Route path="/transactions/recent" component={RecentTransactions} />
            <Route path="/orders/new" component={NewOrder} />
            <Route path="/orders/history" component={OrderHistory} />
            <Route path="/customers" component={Customers} />
            <Route path="/products/add" component={AddProduct} />
            <Route path="/products/stock" component={StockList} />
            <Route path="/products/categories" component={Categories} />
            <Route path="/employees" component={Employees} />
            <Route path="/payroll" component={Payroll} />
            <Route path="/attendance" component={Attendance} />
            <Route path="/accounting/ledger" component={DailyLedger} />
            <Route path="/accounting/expenses" component={ExpenseReport} />
            <Route path="/settings" component={SystemConfig} />
            <Route path="/settings/roles" component={UserRoles} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
