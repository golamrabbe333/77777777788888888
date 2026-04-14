import { useGetPayrollData } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ['hsl(199, 89%, 48%)', 'hsl(271, 91%, 65%)', 'hsl(346, 87%, 62%)'];

export default function Payroll() {
  const { data: payrollData, isLoading } = useGetPayrollData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
        <p className="text-muted-foreground">Salary and compensation overview.</p>
      </div>
      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader><CardTitle>Payroll Breakdown</CardTitle></CardHeader>
        <CardContent className="h-[400px]">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading...</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={payrollData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  dataKey="amount"
                  nameKey="category"
                  label={({ category, amount }) => `${category}: $${amount.toLocaleString()}`}
                >
                  {(payrollData || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px'}}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
