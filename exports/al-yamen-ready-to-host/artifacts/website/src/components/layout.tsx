import { Link, useLocation } from "wouter";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  CreditCard, 
  ShoppingCart, 
  Package, 
  Users, 
  Calculator, 
  Settings,
  LogOut,
  HelpCircle,
  Cuboid,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [supportOpen, setSupportOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    transactions: true,
    orders: true,
    inventory: true,
    hr: true,
    accounting: true,
    settings: true
  });

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({...prev, [group]: !prev[group]}));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <Sidebar className="border-r border-border bg-sidebar">
          <SidebarHeader className="p-4 border-b border-border">
            <div className="flex items-center gap-3 text-primary">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <Cuboid className="w-5 h-5" />
              </div>
              <span className="font-bold tracking-wider text-lg text-foreground">AL-YAMEN</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Overview</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location === "/dashboard"}>
                      <Link href="/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel 
                className="flex items-center justify-between cursor-pointer hover:text-foreground"
                onClick={() => toggleGroup('transactions')}
              >
                Transactions
                <ChevronDown className={`w-4 h-4 transition-transform ${openGroups['transactions'] ? '' : '-rotate-90'}`} />
              </SidebarGroupLabel>
              {openGroups['transactions'] && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/transactions"}>
                        <Link href="/transactions">
                          <CreditCard />
                          <span>All Transactions</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/transactions/add"}>
                        <Link href="/transactions/add">
                          <span>Add Transaction</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/transactions/recent"}>
                        <Link href="/transactions/recent">
                          <span>Recent</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel 
                className="flex items-center justify-between cursor-pointer hover:text-foreground"
                onClick={() => toggleGroup('orders')}
              >
                Sales & Orders
                <ChevronDown className={`w-4 h-4 transition-transform ${openGroups['orders'] ? '' : '-rotate-90'}`} />
              </SidebarGroupLabel>
              {openGroups['orders'] && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/orders/history"}>
                        <Link href="/orders/history">
                          <ShoppingCart />
                          <span>Order History</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/orders/new"}>
                        <Link href="/orders/new">
                          <span>New Order</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/customers"}>
                        <Link href="/customers">
                          <span>Customers</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel 
                className="flex items-center justify-between cursor-pointer hover:text-foreground"
                onClick={() => toggleGroup('inventory')}
              >
                Inventory
                <ChevronDown className={`w-4 h-4 transition-transform ${openGroups['inventory'] ? '' : '-rotate-90'}`} />
              </SidebarGroupLabel>
              {openGroups['inventory'] && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/products/stock"}>
                        <Link href="/products/stock">
                          <Package />
                          <span>Stock List</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/products/add"}>
                        <Link href="/products/add">
                          <span>Add Product</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/products/categories"}>
                        <Link href="/products/categories">
                          <span>Categories</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel 
                className="flex items-center justify-between cursor-pointer hover:text-foreground"
                onClick={() => toggleGroup('hr')}
              >
                HR Management
                <ChevronDown className={`w-4 h-4 transition-transform ${openGroups['hr'] ? '' : '-rotate-90'}`} />
              </SidebarGroupLabel>
              {openGroups['hr'] && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/employees"}>
                        <Link href="/employees">
                          <Users />
                          <span>Employees</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/payroll"}>
                        <Link href="/payroll">
                          <span>Payroll</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/attendance"}>
                        <Link href="/attendance">
                          <span>Attendance</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel 
                className="flex items-center justify-between cursor-pointer hover:text-foreground"
                onClick={() => toggleGroup('accounting')}
              >
                Accounting
                <ChevronDown className={`w-4 h-4 transition-transform ${openGroups['accounting'] ? '' : '-rotate-90'}`} />
              </SidebarGroupLabel>
              {openGroups['accounting'] && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/accounting/ledger"}>
                        <Link href="/accounting/ledger">
                          <Calculator />
                          <span>Ledger</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/accounting/expenses"}>
                        <Link href="/accounting/expenses">
                          <span>Expenses</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel 
                className="flex items-center justify-between cursor-pointer hover:text-foreground"
                onClick={() => toggleGroup('settings')}
              >
                Settings
                <ChevronDown className={`w-4 h-4 transition-transform ${openGroups['settings'] ? '' : '-rotate-90'}`} />
              </SidebarGroupLabel>
              {openGroups['settings'] && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/settings"}>
                        <Link href="/settings">
                          <Settings />
                          <span>System</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={location === "/settings/roles"}>
                        <Link href="/settings/roles">
                          <span>Roles</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-4">
            <div className="flex flex-col gap-4">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
                onClick={() => setSupportOpen(true)}
              >
                <HelpCircle className="w-4 h-4" />
                Support
              </Button>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.role}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => logout()} title="Logout">
                  <LogOut className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center px-4 shrink-0 lg:hidden">
            <SidebarTrigger />
            <div className="ml-4 font-semibold">AL-YAMEN</div>
          </header>
          <div className="flex-1 overflow-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </div>
        </main>
      </div>

      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Admin Support</DialogTitle>
            <DialogDescription>
              Need help with the system? Our support team is available 24/7.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="font-medium">support@alyamen.com</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Phone</span>
              <span className="font-medium">+971 50 123 4567</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">System Status</span>
              <span className="font-medium text-green-500">All Systems Operational</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setSupportOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
