import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Package, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Download,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const overviewStats = [
    { label: "Total Users", value: "2,847", change: "+12%", trend: "up", color: "text-primary" },
    { label: "Food Listings", value: "1,234", change: "+8%", trend: "up", color: "text-secondary" },
    { label: "Successful Claims", value: "956", change: "+15%", trend: "up", color: "text-success" },
    { label: "Revenue (KES)", value: "87,500", change: "+22%", trend: "up", color: "text-trust" }
  ];

  const impactMetrics = [
    { label: "Meals Provided", value: "12,450", icon: <Package className="h-5 w-5" />, color: "text-primary" },
    { label: "Families Helped", value: "2,890", icon: <Users className="h-5 w-5" />, color: "text-secondary" },
    { label: "Food Saved (kg)", value: "5,670", icon: <TrendingUp className="h-5 w-5" />, color: "text-success" },
    { label: "Partner NGOs", value: "48", icon: <Shield className="h-5 w-5" />, color: "text-trust" }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "listing_created",
      message: "New food listing: Fresh Vegetables by Green Farm",
      timestamp: "2 minutes ago",
      status: "info"
    },
    {
      id: 2,
      type: "food_claimed",
      message: "Food claimed: Bread & Pastries by Sarah M.",
      timestamp: "5 minutes ago",
      status: "success"
    },
    {
      id: 3,
      type: "payment_completed", 
      message: "Delivery payment completed: KES 150 via M-Pesa",
      timestamp: "8 minutes ago",
      status: "success"
    },
    {
      id: 4,
      type: "user_registered",
      message: "New donor registered: Downtown Restaurant",
      timestamp: "12 minutes ago", 
      status: "info"
    },
    {
      id: 5,
      type: "listing_expired",
      message: "Listing expired: Cooked Rice (unclaimed)",
      timestamp: "15 minutes ago",
      status: "warning"
    }
  ];

  const pendingActions = [
    {
      id: 1,
      type: "verification",
      title: "NGO Verification Pending",
      description: "Hope Foundation requires account verification",
      priority: "high",
      action: "Review"
    },
    {
      id: 2,
      type: "report",
      title: "Food Safety Report",
      description: "Unusual expiry pattern detected in listings",
      priority: "medium",
      action: "Investigate"
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Dispute",
      description: "Delivery fee dispute for order #1247",
      priority: "medium",
      action: "Resolve"
    }
  ];

  const userStats = [
    { type: "Donors", count: 856, percentage: 30, color: "bg-primary" },
    { type: "Recipients", count: 1624, percentage: 57, color: "bg-secondary" },
    { type: "NGO Admins", count: 289, percentage: 10, color: "bg-trust" },
    { type: "Platform Admins", count: 78, percentage: 3, color: "bg-success" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Platform Analytics</h1>
          <p className="text-muted-foreground">Monitor platform performance and community impact</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gradient-primary">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="p-6 shadow-elegant">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <Badge 
                variant="secondary" 
                className={`${stat.trend === 'up' ? 'text-success bg-success/10 border-success/20' : ''}`}
              >
                {stat.change}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Impact Metrics */}
            <Card className="p-6 shadow-elegant">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Community Impact
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {impactMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-muted/30">
                    <div className={`mx-auto mb-2 ${metric.color}`}>
                      {metric.icon}
                    </div>
                    <div className={`text-2xl font-bold mb-1 ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 shadow-elegant">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className={`p-1 rounded-full ${
                      activity.status === 'success' ? 'bg-success/20 text-success' :
                      activity.status === 'warning' ? 'bg-warning/20 text-warning' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {activity.status === 'success' ? <CheckCircle className="h-3 w-3" /> :
                       activity.status === 'warning' ? <AlertTriangle className="h-3 w-3" /> :
                       <Package className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Pending Actions */}
          <Card className="p-6 shadow-elegant">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Pending Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pendingActions.map((action) => (
                <div key={action.id} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={action.priority === 'high' ? 'destructive' : 'secondary'}>
                      {action.priority} priority
                    </Badge>
                    <Button size="sm" variant="outline">
                      {action.action}
                    </Button>
                  </div>
                  <h4 className="font-semibold mb-2">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* User Distribution */}
          <Card className="p-6 shadow-elegant">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              User Distribution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userStats.map((userType, index) => (
                <div key={index} className="text-center">
                  <div className="mb-3">
                    <div className={`w-full h-2 bg-muted rounded-full mb-2`}>
                      <div 
                        className={`h-full ${userType.color} rounded-full`}
                        style={{ width: `${userType.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{userType.count}</div>
                  <div className="text-sm text-muted-foreground">{userType.type}</div>
                  <div className="text-xs text-muted-foreground">{userType.percentage}%</div>
                </div>
              ))}
            </div>
          </Card>

          {/* User Management Actions */}
          <Card className="p-6 shadow-elegant">
            <h3 className="text-lg font-semibold mb-4">User Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="p-6 h-auto flex flex-col items-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                <span className="font-semibold">Verify NGOs</span>
                <span className="text-sm text-muted-foreground">3 pending</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex flex-col items-center gap-2">
                <Shield className="h-8 w-8 text-secondary" />
                <span className="font-semibold">Moderate Content</span>
                <span className="text-sm text-muted-foreground">7 reports</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex flex-col items-center gap-2">
                <AlertTriangle className="h-8 w-8 text-warning" />
                <span className="font-semibold">Review Violations</span>
                <span className="text-sm text-muted-foreground">2 cases</span>
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="space-y-6">
          <Card className="p-6 shadow-elegant">
            <h3 className="text-lg font-semibold mb-4">Listing Analytics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1,234</div>
                <div className="text-sm text-muted-foreground">Total Listings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">956</div>
                <div className="text-sm text-muted-foreground">Claimed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">189</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">89</div>
                <div className="text-sm text-muted-foreground">Expired</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="p-6 shadow-elegant">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-trust" />
              Payment Analytics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-trust mb-2">KES 87.5K</div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">KES 45.2K</div>
                <div className="text-sm text-muted-foreground">Delivery Fees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">KES 32.1K</div>
                <div className="text-sm text-muted-foreground">Donations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">KES 10.2K</div>
                <div className="text-sm text-muted-foreground">Premium Listings</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { AdminDashboard };