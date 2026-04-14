import { useListTransactions } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function RecentTransactions() {
  const { data: transactions, isLoading } = useListTransactions({ limit: 5 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recent Transactions</h1>
        <p className="text-muted-foreground">Last 5 transactions recorded.</p>
      </div>
      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : transactions?.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No recent transactions</TableCell></TableRow>
                ) : (
                  transactions?.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{format(new Date(tx.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell><Badge variant="outline">{tx.type}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{tx.description}</TableCell>
                      <TableCell className="text-right font-mono font-medium">${tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
