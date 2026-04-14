import { useListTransactions } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TransactionsList() {
  const [search, setSearch] = useState("");
  const { data: transactions, isLoading } = useListTransactions({ search: search || undefined });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Sale': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Purchase': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Expense': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Refund': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Manage and view all business transactions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Transaction History</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers or ref..."
              className="pl-8 bg-background/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer / Ref</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
                  </TableRow>
                ) : transactions?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No transactions found</TableCell>
                  </TableRow>
                ) : (
                  transactions?.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">{format(new Date(tx.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell>{tx.customer}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getTypeColor(tx.type)}>
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-[200px] truncate">{tx.description}</TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        <span className={tx.type === 'Expense' || tx.type === 'Refund' ? 'text-red-500' : 'text-green-500'}>
                          {tx.type === 'Expense' || tx.type === 'Refund' ? '-' : '+'}${tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </span>
                      </TableCell>
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
