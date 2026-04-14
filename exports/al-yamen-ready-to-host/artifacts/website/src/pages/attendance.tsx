import { useListEmployees } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function Attendance() {
  const { data: employees, isLoading } = useListEmployees();

  const present = employees?.filter(e => e.status === 'Present').length || 0;
  const total = employees?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance Tracker</h1>
        <p className="text-muted-foreground">Daily attendance overview.</p>
      </div>
      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader><CardTitle>Today's Attendance</CardTitle></CardHeader>
        <CardContent className="text-center py-12">
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <>
              <p className="text-6xl font-light">{present} / {total}</p>
              <p className="text-green-500 mt-4 text-lg">Present today</p>
              <p className="text-muted-foreground mt-2">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
