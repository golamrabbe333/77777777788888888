import { useListCustomers } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Customers() {
  const { data: customers, isLoading } = useListCustomers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customer List</h1>
        <p className="text-muted-foreground">All registered customers and their activity.</p>
      </div>
      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader><CardTitle>Customers</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : customers?.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No customers found</TableCell></TableRow>
                ) : (
                  customers?.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c.company}</TableCell>
                      <TableCell>{c.phone}</TableCell>
                      <TableCell className="text-muted-foreground">{c.lastOrder || "N/A"}</TableCell>
                      <TableCell className="text-right font-mono font-medium">${c.totalSpent.toLocaleString(undefined, {minimumFractionDigits: 2})}</TableCell>
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
