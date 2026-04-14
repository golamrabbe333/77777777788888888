import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Bell, Shield, Database } from "lucide-react";

export default function SystemConfig() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Configuration</h1>
        <p className="text-muted-foreground">Manage system settings and preferences.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur border-border">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Theme, language, timezone, and display preferences.</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-border">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Email alerts, push notifications, and digest settings.</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-border">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Password policies, two-factor auth, and session management.</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-border">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <CardTitle>Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Database backups, export settings, and restore options.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
