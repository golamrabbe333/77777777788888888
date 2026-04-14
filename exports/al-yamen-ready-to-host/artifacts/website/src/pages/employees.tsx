import { useListEmployees } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle } from "lucide-react";

export default function Employees() {
  const { data: employees, isLoading } = useListEmployees();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employee Information</h1>
        <p className="text-muted-foreground">Full employee directory.</p>
      </div>
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading employees...</div>
      ) : employees?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No employees found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees?.map((e) => (
            <Card key={e.id} className="bg-card/50 backdrop-blur border-border">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">{e.name}</h3>
                <p className="text-sm text-muted-foreground">{e.role}</p>
                {e.department && <p className="text-xs text-muted-foreground mt-1">{e.department}</p>}
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Badge variant="outline" className={e.status === 'Present' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}>
                    {e.status}
                  </Badge>
                </div>
                <p className="text-sm font-mono text-muted-foreground mt-2">${e.salary.toLocaleString()}/mo</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
