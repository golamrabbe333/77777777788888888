import { useGetDailyLedger } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

export default function DailyLedger() {
  const { data: ledger, isLoading } = useGetDailyLedger();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Ledger</h1>
        <p className="text-muted-foreground">Financial summary for today.</p>
      </div>
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Balance</CardTitle>
              <Wallet className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">${ledger?.totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
              <p className="text-xs text-muted-foreground mt-1">{ledger?.date}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Income</CardTitle>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${ledger?.totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Expenses</CardTitle>
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">${ledger?.totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
