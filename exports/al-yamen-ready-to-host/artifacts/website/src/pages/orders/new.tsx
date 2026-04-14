import { useCreateOrder, getListOrdersQueryKey } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const schema = z.object({
  customer: z.string().min(1, "Customer is required"),
  date: z.string().min(1, "Date is required"),
  total: z.coerce.number().positive("Total must be positive"),
});

export default function NewOrder() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const mutation = useCreateOrder();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      customer: "",
      date: new Date().toISOString().split("T")[0],
      total: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutation.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Order placed successfully" });
        queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() });
        setLocation("/orders/history");
      },
      onError: () => {
        toast({ title: "Failed to place order", variant: "destructive" });
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Order</h1>
        <p className="text-muted-foreground">Create a new customer order.</p>
      </div>
      <Card className="bg-card/50 backdrop-blur border-border max-w-2xl">
        <CardHeader><CardTitle>Order Details</CardTitle></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="customer" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <FormControl><Input className="bg-background/50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Date</FormLabel>
                    <FormControl><Input type="date" className="bg-background/50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="total" render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Order Total ($)</FormLabel>
                    <FormControl><Input type="number" step="0.01" className="bg-background/50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={mutation.isPending}>
                {mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Placing Order...</> : "Place Order"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
