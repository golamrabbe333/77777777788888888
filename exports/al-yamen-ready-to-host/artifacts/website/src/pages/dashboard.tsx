import { useGetDashboardSummary, useGetRevenueChart } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Activity, Users, FileText, CalendarDays, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: summary, isLoading: isLoadingSummary } = useGetDashboardSummary();
  const { data: revenueData, isLoading: isLoadingRevenue } = useGetRevenueChart();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, isLoading }: any) => (
    <Card className="bg-card/50 backdrop-blur border-border overflow-hidden relative">
      <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-[100px]" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {trend && !isLoading && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            {trend > 0 ? (
              <span className="text-green-500 flex items-center"><ArrowUpRight className="w-3 h-3" /> +{trend}%</span>
            ) : (
              <span className="text-red-500 flex items-center"><ArrowDownRight className="w-3 h-3" /> {trend}%</span>
            )}
            {" "}from last month
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground">Overview of your business operations today.</p>
        </div>
        <div className="flex items-center gap-4 bg-card/50 px-4 py-2 rounded-lg border border-border backdrop-blur">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono text-lg">{format(time, 'HH:mm:ss')}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{format(time, 'EEEE, MMM d, yyyy')}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Annual Revenue" 
          value={summary ? `$${summary.annualRevenue.toLocaleString()}` : "$0"} 
          icon={DollarSign} 
          trend={summary?.growthRate}
          isLoading={isLoadingSummary}
        />
        <StatCard 
          title="Total Transactions" 
          value={summary?.totalTransactions.toLocaleString()} 
          icon={Activity} 
          isLoading={isLoadingSummary}
        />
        <StatCard 
          title="Active Staff" 
          value={summary?.activeStaff} 
          icon={Users} 
          isLoading={isLoadingSummary}
        />
        <StatCard 
          title="Staff on Leave" 
          value={summary?.onLeave} 
          icon={FileText} 
          isLoading={isLoadingSummary}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-5 bg-card/50 backdrop-blur border-border">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {isLoadingRevenue ? (
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    cursor={{fill: 'hsl(var(--primary)/0.1)'}}
                    contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px'}}
                  />
                  <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                    {(revenueData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="hsl(var(--primary))" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2 bg-card/50 backdrop-blur border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingSummary ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {summary?.recentTransactions?.map(tx => (
                  <div key={tx.id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">{tx.customer}</p>
                      <p className="text-xs text-muted-foreground">{tx.type} • {format(new Date(tx.date), 'MMM d')}</p>
                    </div>
                    <div className={`text-sm font-medium ${tx.type === 'Expense' || tx.type === 'Refund' ? 'text-destructive' : 'text-green-500'}`}>
                      {tx.type === 'Expense' || tx.type === 'Refund' ? '-' : '+'}${tx.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
                {(!summary?.recentTransactions || summary.recentTransactions.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No recent activity
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
