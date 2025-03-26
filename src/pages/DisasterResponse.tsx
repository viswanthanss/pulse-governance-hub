
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Droplet,
  Cloud,
  Wind,
  MapPin,
  Bell,
  Building,
  Waves,
  Umbrella,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for disaster analytics
const alertsData = [
  {
    id: "AL001",
    type: "Flood",
    location: "Kolhapur District",
    severity: "High",
    date: "2024-06-15",
    description: "Heavy rainfall predicted. Areas near Krishna river basin should be on high alert.",
    icon: <Waves className="h-5 w-5" />,
    color: "red"
  },
  {
    id: "AL002",
    type: "Drought",
    location: "Marathwada Region",
    severity: "Medium",
    date: "2024-05-20",
    description: "Continued dry spell affecting agricultural regions. Water conservation advisories in effect.",
    icon: <Droplet className="h-5 w-5" />,
    color: "amber"
  },
  {
    id: "AL003",
    type: "Storm",
    location: "Coastal Maharashtra",
    severity: "Medium",
    date: "2024-06-10",
    description: "Strong winds and thunderstorms expected along the coastal areas. Fishermen advised not to venture into sea.",
    icon: <Wind className="h-5 w-5" />,
    color: "amber"
  },
  {
    id: "AL004",
    type: "Landslide",
    location: "Western Ghats",
    severity: "Low",
    date: "2024-06-18",
    description: "Potential risk in hilly regions due to recent rainfall. Monitoring ongoing.",
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "green"
  },
  {
    id: "AL005",
    type: "Flood",
    location: "Nagpur District",
    severity: "Low",
    date: "2024-06-22",
    description: "Moderate rainfall expected. Low-lying areas should remain cautious.",
    icon: <Waves className="h-5 w-5" />,
    color: "green"
  }
];

const waterData = [
  { name: "Krishna Basin", current: 65, capacity: 100 },
  { name: "Godavari Basin", current: 42, capacity: 100 },
  { name: "Tapi Basin", current: 30, capacity: 100 },
  { name: "Narmada Basin", current: 57, capacity: 100 },
  { name: "Coastal Basins", current: 78, capacity: 100 }
];

const rainfallData = [
  { name: "Jan", actual: 20, historical: 15 },
  { name: "Feb", actual: 35, historical: 25 },
  { name: "Mar", actual: 50, historical: 45 },
  { name: "Apr", actual: 65, historical: 70 },
  { name: "May", actual: 80, historical: 85 },
  { name: "Jun", actual: 55, historical: 90 }
];

const waterProjectData = [
  { name: "Completed", value: 63 },
  { name: "In Progress", value: 27 },
  { name: "Planned", value: 10 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DisasterResponse = () => {
  const [activeTab, setActiveTab] = useState("alerts");
  const [subscribedAlerts, setSubscribedAlerts] = useState<string[]>(["AL001", "AL003"]);

  const toggleAlertSubscription = (alertId: string) => {
    setSubscribedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId) 
        : [...prev, alertId]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Disaster Response & Predictions</h1>
          <p className="text-muted-foreground">
            AI-powered analytics for disaster response, water management, and urban planning
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="water">Water Management</TabsTrigger>
            <TabsTrigger value="urban">Urban Planning</TabsTrigger>
          </TabsList>

          {/* Alerts Tab Content */}
          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Disaster Alerts</CardTitle>
                <CardDescription>
                  AI-generated predictions and alerts based on real-time data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-red-100 text-red-800">High Risk</Badge>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">Medium Risk</Badge>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Low Risk</Badge>
                  </div>
                  <div className="flex items-center">
                    <Input placeholder="Search by location..." className="max-w-xs" />
                  </div>
                </div>

                <div className="space-y-4">
                  {alertsData.map((alert) => (
                    <div key={alert.id} className="rounded-lg border p-4 animate-fade-in">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex items-start gap-3">
                          <div className={`rounded-full p-2 ${alert.color === 'red' ? 'bg-red-100' : alert.color === 'amber' ? 'bg-amber-100' : 'bg-green-100'}`}>
                            {alert.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{alert.type}</h3>
                              <Badge className={getSeverityColor(alert.severity)}>{alert.severity} Risk</Badge>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{alert.location}</span>
                              <span>•</span>
                              <span>{new Date(alert.date).toLocaleDateString()}</span>
                            </div>
                            <p className="mt-2 text-sm">{alert.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={subscribedAlerts.includes(alert.id) ? "default" : "outline"} 
                            size="sm"
                            onClick={() => toggleAlertSubscription(alert.id)}
                          >
                            <Bell className="mr-2 h-4 w-4" />
                            {subscribedAlerts.includes(alert.id) ? "Subscribed" : "Subscribe"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <MapPin className="mr-2 h-4 w-4" />
                            View Map
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 rounded-lg border p-6">
                  <div className="text-center">
                    <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-primary/60" />
                    <h3 className="mb-2 text-xl font-medium">AI-Powered Disaster Prediction</h3>
                    <p className="mx-auto max-w-md text-muted-foreground">
                      Our AI algorithms analyze historical data, weather patterns, geographical information, and real-time sensor data to predict potential disasters.
                    </p>
                  </div>
                  
                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Cloud className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 font-medium">Weather Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Continuous monitoring of meteorological data and forecasts
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 font-medium">Geospatial Mapping</h4>
                      <p className="text-sm text-muted-foreground">
                        Advanced terrain analysis and vulnerability assessment
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Bell className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 font-medium">Early Warning System</h4>
                      <p className="text-sm text-muted-foreground">
                        Timely alerts sent to citizens and authorities
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Water Management Tab Content */}
          <TabsContent value="water" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Water Resource Management</CardTitle>
                <CardDescription>
                  Jalyukt Shivar Abhiyan analytics and water conservation insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Water Reservoir Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            width={500}
                            height={300}
                            data={waterData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="current" fill="#8884d8" name="Current Level (%)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Rainfall Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            width={500}
                            height={300}
                            data={rainfallData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="actual" fill="#82ca9d" name="Actual Rainfall (mm)" />
                            <Bar dataKey="historical" fill="#8884d8" name="Historical Average (mm)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Jalyukt Shivar Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={waterProjectData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {waterProjectData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Water Conservation Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                            <div className="flex items-start gap-3">
                              <Droplet className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-blue-800">Marathwada Region</h4>
                                <p className="text-sm text-blue-700">
                                  Implement rainwater harvesting structures in 35 additional villages to improve groundwater recharge before monsoon season.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                            <div className="flex items-start gap-3">
                              <Umbrella className="h-5 w-5 text-amber-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-amber-800">Western Maharashtra</h4>
                                <p className="text-sm text-amber-700">
                                  Predicted excess rainfall may cause overflow in 12 dams. Recommend controlled release planning and flood preparedness in downstream areas.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                            <div className="flex items-start gap-3">
                              <Wind className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-green-800">Vidarbha Region</h4>
                                <p className="text-sm text-green-700">
                                  Promote drip irrigation for cotton farms to reduce water consumption by an estimated 30% while maintaining crop yields.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Urban Planning Tab Content */}
          <TabsContent value="urban" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Cities Mission Analytics</CardTitle>
                <CardDescription>
                  AI-driven insights for urban planning and smart city initiatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Building className="h-12 w-12 text-primary" />
                    <div>
                      <h3 className="text-xl font-medium">Smart City Development Index</h3>
                      <p className="text-muted-foreground">
                        AI-generated assessment of urban infrastructure and smart city initiatives
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-card p-4 shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Pune</p>
                          <h4 className="text-2xl font-bold">85.3</h4>
                        </div>
                        <div className="rounded-full bg-green-100 p-2 text-green-800">
                          <Building className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-primary/20">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-card p-4 shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Mumbai</p>
                          <h4 className="text-2xl font-bold">79.6</h4>
                        </div>
                        <div className="rounded-full bg-green-100 p-2 text-green-800">
                          <Building className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-primary/20">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-card p-4 shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Nagpur</p>
                          <h4 className="text-2xl font-bold">72.1</h4>
                        </div>
                        <div className="rounded-full bg-amber-100 p-2 text-amber-800">
                          <Building className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-primary/20">
                        <div className="h-2 rounded-full bg-amber-500" style={{ width: "72%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Urban Planning Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Traffic Congestion Reduction</h4>
                            <p className="text-sm text-muted-foreground">
                              AI analysis suggests implementing smart traffic lights in 7 key junctions in Mumbai to reduce congestion by 23%.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Droplet className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Water Management</h4>
                            <p className="text-sm text-muted-foreground">
                              Deploy IoT-based water meters in Pune's western sectors to reduce water wastage by an estimated 15%.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Building className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Green Building Initiative</h4>
                            <p className="text-sm text-muted-foreground">
                              Recommended zoning changes for Nagpur could increase energy-efficient construction by 30% over 5 years.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Disaster Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 p-3">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-800">Mumbai Coastal Areas</h4>
                            <p className="text-sm text-red-700">
                              High risk of urban flooding in low-lying areas during monsoon. Recommended infrastructure improvements needed.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-amber-800">Pune Hill Regions</h4>
                            <p className="text-sm text-amber-700">
                              Medium risk of landslides in recent construction areas. Additional slope stabilization recommended.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 rounded-lg bg-green-50 border border-green-200 p-3">
                          <AlertTriangle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-800">Nagpur Urban Core</h4>
                            <p className="text-sm text-green-700">
                              Low risk assessment for natural disasters. Focus recommended on improving emergency response systems.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-4 rounded-lg border p-6">
                  <div className="text-center">
                    <Building className="mx-auto mb-4 h-16 w-16 text-primary/60" />
                    <h3 className="mb-2 text-xl font-medium">Smart City Benefits</h3>
                    <p className="mx-auto max-w-md text-muted-foreground">
                      Our AI-driven analytics help urban planners make data-driven decisions for creating sustainable, efficient, and resilient cities.
                    </p>
                  </div>
                  
                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <h4 className="mb-2 font-medium">26%</h4>
                      <p className="text-sm text-muted-foreground">
                        Average reduction in traffic congestion in smart city areas
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <h4 className="mb-2 font-medium">18%</h4>
                      <p className="text-sm text-muted-foreground">
                        Decrease in energy consumption through efficient urban planning
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <h4 className="mb-2 font-medium">42%</h4>
                      <p className="text-sm text-muted-foreground">
                        Improvement in disaster response times with AI-based early warnings
                      </p>
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

export default DisasterResponse;
