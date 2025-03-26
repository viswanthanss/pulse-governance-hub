
import { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Download, Share2 } from "lucide-react";

// Mock data for budget allocation
const budgetData = [
  { name: "Education", value: 25 },
  { name: "Healthcare", value: 20 },
  { name: "Infrastructure", value: 18 },
  { name: "Agriculture", value: 15 },
  { name: "Urban Development", value: 10 },
  { name: "Other", value: 12 },
];

// Mock data for monthly grievance resolution
const grievanceData = [
  { month: "Jan", resolved: 450, received: 500 },
  { month: "Feb", resolved: 480, received: 520 },
  { month: "Mar", resolved: 520, received: 580 },
  { month: "Apr", resolved: 550, received: 600 },
  { month: "May", resolved: 580, received: 620 },
  { month: "Jun", resolved: 600, received: 650 },
  { month: "Jul", resolved: 620, received: 680 },
  { month: "Aug", resolved: 650, received: 700 },
  { month: "Sep", resolved: 670, received: 720 },
  { month: "Oct", resolved: 700, received: 750 },
  { month: "Nov", resolved: 720, received: 780 },
  { month: "Dec", resolved: 750, received: 800 },
];

// Mock data for district-wise scheme implementation
const schemeData = [
  { district: "Mumbai", implemented: 92, target: 100 },
  { district: "Pune", implemented: 85, target: 100 },
  { district: "Nagpur", implemented: 78, target: 100 },
  { district: "Thane", implemented: 80, target: 100 },
  { district: "Nashik", implemented: 75, target: 100 },
  { district: "Aurangabad", implemented: 70, target: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

const DataVisualization = () => {
  const [timeFrame, setTimeFrame] = useState("yearly");
  const [chartType, setChartType] = useState("bar");
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Interactive Data Visualization</h1>
          <p className="text-muted-foreground">
            Real-time dashboards and insights for government schemes and services
          </p>
        </div>
        
        <Tabs defaultValue="governance" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="governance">Governance Insights</TabsTrigger>
            <TabsTrigger value="schemes">Scheme Implementation</TabsTrigger>
            <TabsTrigger value="budget">Budget Allocation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="governance" className="mt-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Grievance Resolution Trends</CardTitle>
                  <CardDescription>
                    Monthly trend of grievances received vs. resolved
                  </CardDescription>
                </div>
                <div className="mt-4 flex gap-3 sm:mt-0">
                  <Select
                    value={timeFrame}
                    onValueChange={setTimeFrame}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select time frame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={chartType}
                    onValueChange={setChartType}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "bar" ? (
                      <BarChart
                        data={grievanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="received" name="Grievances Received" fill="#8884d8" />
                        <Bar dataKey="resolved" name="Grievances Resolved" fill="#82ca9d" />
                      </BarChart>
                    ) : (
                      <LineChart
                        data={grievanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="received" name="Grievances Received" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="resolved" name="Grievances Resolved" stroke="#82ca9d" />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Insights
                  </Button>
                </div>
                
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Average Resolution Time</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">5.2 days</div>
                      <p className="text-xs text-muted-foreground">8% better than last year</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Satisfaction Rating</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">4.2/5</div>
                      <p className="text-xs text-muted-foreground">Based on 12,450 ratings</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Resolution Rate</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">92%</div>
                      <p className="text-xs text-muted-foreground">Up from 85% last year</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schemes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>District-wise Scheme Implementation</CardTitle>
                <CardDescription>
                  Progress of government schemes across districts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={schemeData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="district" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="implemented" name="Schemes Implemented" fill="#8884d8" />
                      <Bar dataKey="target" name="Target" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Implementation Insights</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-3 w-3 rounded-full bg-green-500"></div>
                      <span><span className="font-medium">Mumbai</span> leads with 92% implementation rate, driven by efficient digital infrastructure and strong administrative oversight.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-3 w-3 rounded-full bg-amber-500"></div>
                      <span><span className="font-medium">Aurangabad</span> shows the lowest implementation at 70%, facing challenges in last-mile delivery and staff shortages.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>Overall implementation across Maharashtra has improved by 12% compared to the previous fiscal year.</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="budget" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation Breakdown</CardTitle>
                <CardDescription>
                  Sectoral distribution of government budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="flex h-[400px] items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {budgetData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value} billion`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h3 className="mb-4 font-medium">Allocation Details (in billions ₹)</h3>
                    <div className="space-y-4">
                      {budgetData.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <div className="flex flex-1 items-center justify-between">
                            <span className="font-medium">{item.name}</span>
                            <span>₹{item.value} billion</span>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-2 pt-4 text-right text-lg font-bold border-t">
                        Total: ₹100 billion
                      </div>
                    </div>
                    
                    <div className="mt-8 rounded-lg border p-4">
                      <h3 className="mb-2 font-medium">Budget Insights</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5 h-3 w-3 rounded-full bg-green-500"></div>
                          <span>Education sector saw a 5% increase compared to last fiscal year.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5 h-3 w-3 rounded-full bg-amber-500"></div>
                          <span>Infrastructure spending prioritizes rural connectivity with 60% allocation.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5 h-3 w-3 rounded-full bg-blue-500"></div>
                          <span>Healthcare budget includes ₹5 billion for modernizing district hospitals.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DataVisualization;
