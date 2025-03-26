
import { useState } from "react";
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
import {
  AlertTriangle,
  Cloud,
  Droplet,
  MapPin,
  AlertCircle,
  ArrowRight,
  Bell,
} from "lucide-react";
import { toast } from "sonner";

// Mock data for alerts
const alertsData = [
  {
    id: "alert-1",
    type: "Flood",
    severity: "high",
    area: "Nagpur District",
    message: "Heavy rainfall expected in Nagpur district. Rivers might overflow in the next 24-48 hours. Take necessary precautions.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: "active"
  },
  {
    id: "alert-2",
    type: "Drought",
    severity: "medium",
    area: "Marathwada Region",
    message: "Rainfall deficiency continues in Marathwada. Water rationing might be implemented in the coming weeks.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    status: "active"
  },
  {
    id: "alert-3",
    type: "Landslide",
    severity: "high",
    area: "Western Ghats",
    message: "Increased risk of landslides in Western Ghats due to continuous rainfall. Avoid travel in affected areas.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    status: "active"
  },
  {
    id: "alert-4",
    type: "Heatwave",
    severity: "medium",
    area: "Vidarbha Region",
    message: "Heatwave conditions expected in Vidarbha over the next week. Stay hydrated and avoid outdoor activities during peak hours.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    status: "active"
  },
  {
    id: "alert-5",
    type: "Cyclone",
    severity: "high",
    area: "Coastal Maharashtra",
    message: "Cyclonic storm forming in Arabian Sea may impact coastal Maharashtra in 48-72 hours. Fishermen advised not to venture into the sea.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    status: "active"
  }
];

// Mock data for water levels
const waterLevelsData = [
  { name: "Koyna Dam", level: 78, status: "Normal" },
  { name: "Ujani Dam", level: 42, status: "Warning" },
  { name: "Jayakwadi Dam", level: 35, status: "Critical" },
  { name: "Bhatsa Dam", level: 65, status: "Normal" },
  { name: "Khadakwasla Dam", level: 70, status: "Normal" }
];

const DisasterResponse = () => {
  const [activeRegion, setActiveRegion] = useState("all");
  const [alertType, setAlertType] = useState("all");
  
  const filteredAlerts = alertsData.filter(alert => {
    const matchesRegion = activeRegion === "all" || alert.area.toLowerCase().includes(activeRegion.toLowerCase());
    const matchesType = alertType === "all" || alert.type.toLowerCase() === alertType.toLowerCase();
    return matchesRegion && matchesType;
  });
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-green-500 bg-green-50";
      case "medium": return "text-amber-500 bg-amber-50";
      case "high": return "text-red-500 bg-red-50";
      default: return "text-slate-500 bg-slate-50";
    }
  };
  
  const getAlertTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "flood": return <Droplet className="h-4 w-4" />;
      case "drought": return <Cloud className="h-4 w-4" />;
      case "cyclone": return <Cloud className="h-4 w-4" />;
      case "heatwave": return <AlertCircle className="h-4 w-4" />;
      case "landslide": return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };
  
  const handleSubscribe = () => {
    toast.success("Subscribed to alerts", {
      description: "You will now receive real-time notifications for this area",
    });
  };
  
  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Disaster Response & Predictive Analytics</h1>
          <p className="text-muted-foreground">
            AI-powered real-time alerts, interactive maps, and predictive analytics for disaster management
          </p>
        </div>
        
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
            <TabsTrigger value="water">Water Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>AI-Generated Alerts</CardTitle>
                  <CardDescription>
                    Real-time alerts powered by predictive AI models
                  </CardDescription>
                </div>
                <div className="mt-4 flex gap-3 sm:mt-0">
                  <Button onClick={handleSubscribe}>
                    <Bell className="mr-2 h-4 w-4" />
                    Subscribe to Alerts
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={activeRegion}
                      onValueChange={setActiveRegion}
                    >
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Filter by region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="nagpur">Nagpur District</SelectItem>
                        <SelectItem value="marathwada">Marathwada Region</SelectItem>
                        <SelectItem value="western ghats">Western Ghats</SelectItem>
                        <SelectItem value="vidarbha">Vidarbha Region</SelectItem>
                        <SelectItem value="coastal">Coastal Maharashtra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={alertType}
                      onValueChange={setAlertType}
                    >
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Filter by alert type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Alert Types</SelectItem>
                        <SelectItem value="flood">Flood</SelectItem>
                        <SelectItem value="drought">Drought</SelectItem>
                        <SelectItem value="cyclone">Cyclone</SelectItem>
                        <SelectItem value="heatwave">Heatwave</SelectItem>
                        <SelectItem value="landslide">Landslide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredAlerts.length > 0 ? (
                    filteredAlerts.map((alert) => (
                      <div key={alert.id} className="rounded-lg border p-4 animate-fade-in">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                                {getAlertTypeIcon(alert.type)}
                                {alert.type}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {formatTimeAgo(alert.timestamp)}
                              </span>
                            </div>
                            <h3 className="mt-1 font-semibold">{alert.area}</h3>
                            <p className="mt-2 text-sm">{alert.message}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View on Map
                            </Button>
                            <Button size="sm">
                              Take Action <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <Bell className="mb-2 h-10 w-10 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No alerts found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        No active alerts matching your criteria
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="map" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Disaster Management Map</CardTitle>
                <CardDescription>
                  AI-powered predictive mapping for disaster monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[400px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-muted/20">
                  <MapPin className="mb-4 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Interactive Map</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    An interactive map with real-time disaster data would be displayed here
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Using MapboxGL with disaster overlays and real-time updating
                  </p>
                </div>
                
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Active Disaster Events</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">{filteredAlerts.length}</div>
                      <p className="text-xs text-muted-foreground">Across Maharashtra</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Population at Risk</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">1.2M</div>
                      <p className="text-xs text-muted-foreground">Across affected areas</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Evacuations Required</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">23,450</div>
                      <p className="text-xs text-muted-foreground">Based on AI predictions</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="water" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Water Management Dashboard</CardTitle>
                <CardDescription>
                  Real-time water level monitoring and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium">Dam/Reservoir</th>
                        <th className="p-3 text-left font-medium">Current Level</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waterLevelsData.map((dam, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{dam.name}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                                <div 
                                  className={`h-full ${
                                    dam.status === "Critical" 
                                      ? "bg-red-500" 
                                      : dam.status === "Warning" 
                                        ? "bg-amber-500" 
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${dam.level}%` }}
                                />
                              </div>
                              <span>{dam.level}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                              dam.status === "Critical" 
                                ? "bg-red-50 text-red-500" 
                                : dam.status === "Warning" 
                                  ? "bg-amber-50 text-amber-500" 
                                  : "bg-green-50 text-green-500"
                            }`}>
                              {dam.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <Button variant="outline" size="sm">View Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">AI-Powered Water Management Insights</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                      <span>Ujani Dam water levels have dropped 15% in the last month. Consider water rationing in affected districts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                      <span>Jayakwadi Dam is at critical levels. Immediate water management interventions required.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                      <span>Based on rainfall predictions, Koyna Dam is expected to reach 90% capacity in the next 2 weeks.</span>
                    </li>
                  </ul>
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
