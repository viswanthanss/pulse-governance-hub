
import { useState } from "react";
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  BarChart3, 
  PieChart,
  Calendar,
  Download
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for the charts
// In a real app, these would come from your data source
const recentActivities = [
  {
    id: "act1",
    title: "Ration Card Application",
    status: "Under Review",
    lastUpdated: "2 hours ago",
    department: "Food & Civil Supplies"
  },
  {
    id: "act2",
    title: "Income Certificate",
    status: "Approved",
    lastUpdated: "1 day ago",
    department: "Revenue Department"
  },
  {
    id: "act3",
    title: "PM Kisan Subsidy",
    status: "Disbursed",
    lastUpdated: "3 days ago",
    department: "Agriculture Department"
  },
  {
    id: "act4",
    title: "Water Bill Payment",
    status: "Completed",
    lastUpdated: "1 week ago",
    department: "Municipal Corporation"
  }
];

const upcomingDeadlines = [
  {
    id: "dead1",
    title: "Property Tax Filing",
    deadline: "Oct 15, 2023",
    daysLeft: 5,
    department: "Revenue Department"
  },
  {
    id: "dead2",
    title: "MahaDBT Scholarship Renewal",
    deadline: "Oct 30, 2023",
    daysLeft: 20,
    department: "Education Department"
  },
  {
    id: "dead3",
    title: "Agricultural Subsidy Application",
    deadline: "Nov 10, 2023",
    daysLeft: 31,
    department: "Agriculture Department"
  }
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your government services and applications.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Last 7 days</SelectItem>
                <SelectItem value="monthly">Last 30 days</SelectItem>
                <SelectItem value="quarterly">Last 3 months</SelectItem>
                <SelectItem value="yearly">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Applications"
            value="5"
            icon={<FileText className="h-6 w-6" />}
            trend={{ value: 20, isPositive: true }}
            className="animate-fade-in"
          />
          <StatCard
            title="Resolved Grievances"
            value="12"
            icon={<CheckCircle className="h-6 w-6" />}
            trend={{ value: 15, isPositive: true }}
            className="animate-fade-in delay-100"
          />
          <StatCard
            title="Pending Approvals"
            value="3"
            icon={<Clock className="h-6 w-6" />}
            trend={{ value: 10, isPositive: false }}
            className="animate-fade-in delay-200"
          />
          <StatCard
            title="Available Schemes"
            value="8"
            icon={<Users className="h-6 w-6" />}
            className="animate-fade-in delay-300"
          />
        </div>
        
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2 animate-fade-in delay-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>Status of your recent applications and services</CardDescription>
              </div>
              <Tabs defaultValue="all" className="w-[300px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-center p-8 space-y-3">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/60" />
                  <h3 className="text-xl font-medium">Application Status Chart</h3>
                  <p className="text-sm text-muted-foreground">This is a placeholder for an interactive chart showing your application statuses across different departments.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-200">
            <CardHeader>
              <CardTitle>Subsidy Distribution</CardTitle>
              <CardDescription>Benefits received across schemes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-center p-8 space-y-3">
                  <PieChart className="h-16 w-16 text-muted-foreground/60" />
                  <h3 className="text-xl font-medium">Subsidy Chart</h3>
                  <p className="text-sm text-muted-foreground">This is a placeholder for a pie chart showing the distribution of subsidies you've received.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="animate-fade-in delay-300">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest interactions with government services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p 
                        className={
                          activity.status === "Approved" || activity.status === "Completed" || activity.status === "Disbursed"
                            ? "text-green-500"
                            : activity.status === "Under Review"
                            ? "text-amber-500"
                            : "text-muted-foreground"
                        }
                      >
                        {activity.status}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.lastUpdated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-400">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Stay on top of important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-sm text-muted-foreground">{deadline.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{deadline.deadline}</p>
                      <p 
                        className={
                          deadline.daysLeft <= 7
                            ? "text-red-500 text-xs"
                            : deadline.daysLeft <= 14
                            ? "text-amber-500 text-xs"
                            : "text-green-500 text-xs"
                        }
                      >
                        {deadline.daysLeft} days left
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
