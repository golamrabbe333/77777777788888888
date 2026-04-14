import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Crown, User } from "lucide-react";

const roles = [
  {
    name: "Super Admin",
    icon: Crown,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    permissions: ["Full system access", "User management", "System configuration", "Data export", "Audit logs"],
  },
  {
    name: "Manager",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    permissions: ["View reports", "Manage orders", "Manage inventory", "Employee oversight"],
  },
  {
    name: "Staff",
    icon: User,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    permissions: ["Create transactions", "View inventory", "View own attendance"],
  },
];

export default function UserRoles() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Roles & Permissions</h1>
        <p className="text-muted-foreground">Role-based access control configuration.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Card key={role.name} className="bg-card/50 backdrop-blur border-border">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${role.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <Icon className={`w-8 h-8 ${role.color}`} />
                </div>
                <CardTitle>{role.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {role.permissions.map((perm) => (
                    <div key={perm} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${role.bgColor.replace('/10', '')}`} />
                      <span className="text-sm text-muted-foreground">{perm}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
