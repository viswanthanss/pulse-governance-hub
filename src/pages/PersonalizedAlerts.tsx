
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Bell,
  Calendar,
  Check,
  Clock,
  Filter,
  MapPin,
  Search,
  Settings,
  X
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Mock data for alerts
const alertsData = [
  {
    id: "alert-1",
    title: "Farmer Subsidy Deadline",
    description: "The deadline for applying to the Farmer Loan Waiver Scheme is approaching. Last date: July 15, 2023.",
    category: "Subsidy",
    priority: "high",
    date: "2023-07-10",
    isRead: false
  },
  {
    id: "alert-2",
    title: "Road Closure Update",
    description: "Planned road closure on MG Road for repairs from July 12-15. Please use alternate routes.",
    category: "Infrastructure",
    priority: "medium",
    date: "2023-07-08",
    isRead: false
  },
  {
    id: "alert-3",
    title: "New Scholarship Program",
    description: "A new scholarship program for higher education has been launched. Applications open until August 30.",
    category: "Education",
    priority: "medium",
    date: "2023-07-05",
    isRead: true
  },
  {
    id: "alert-4",
    title: "Water Supply Interruption",
    description: "Scheduled water supply interruption in Andheri East on July 11 from 10 AM to 4 PM for maintenance work.",
    category: "Utilities",
    priority: "high",
    date: "2023-07-06",
    isRead: false
  },
  {
    id: "alert-5",
    title: "Property Tax Policy Update",
    description: "The state government has announced changes to property tax calculations effective from September 1.",
    category: "Policy",
    priority: "low",
    date: "2023-07-01",
    isRead: true
  }
];

const PersonalizedAlerts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  
  const [preferences, setPreferences] = useState({
    subsidyAlerts: true,
    policyChanges: true,
    infrastructureUpdates: true,
    disasterAlerts: true,
    educationNotifications: false,
    healthcareUpdates: true,
    employmentOpportunities: false,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    dailyDigest: false
  });
  
  const [location, setLocation] = useState({
    district: "Mumbai",
    taluka: "Andheri",
    useCurrentLocation: true
  });
  
  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === "all" || 
      alert.category.toLowerCase() === categoryFilter.toLowerCase();
    
    const matchesPriority = 
      priorityFilter === "all" || 
      alert.priority === priorityFilter;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });
  
  const handleTogglePreference = (preference: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
    
    toast.success("Preferences updated", {
      description: `You have ${preferences[preference] ? "unsubscribed from" : "subscribed to"} ${formatPreferenceName(preference)} alerts.`,
    });
  };
  
  const formatPreferenceName = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };
  
  const handleSaveLocation = () => {
    toast.success("Location preferences updated", {
      description: "You will now receive alerts relevant to your location.",
    });
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-500 border-red-200";
      case "medium": return "bg-amber-50 text-amber-500 border-amber-200";
      case "low": return "bg-green-50 text-green-500 border-green-200";
      default: return "bg-slate-50 text-slate-500 border-slate-200";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Personalized Alerts</h1>
          <p className="text-muted-foreground">
            Receive customized notifications about subsidies, policy changes, and local updates
          </p>
        </div>
        
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="alerts">My Alerts</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Your Personalized Alerts</CardTitle>
                  <CardDescription>
                    Important updates tailored to your profile and interests
                  </CardDescription>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Mark All as Read
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="subsidy">Subsidy</SelectItem>
                          <SelectItem value="policy">Policy</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Select
                      value={priorityFilter}
                      onValueChange={setPriorityFilter}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredAlerts.length > 0 ? (
                    filteredAlerts.map((alert) => (
                      <div 
                        key={alert.id} 
                        className={`rounded-lg border p-4 animate-fade-in ${alert.isRead ? 'bg-muted/20' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className={`${alert.isRead ? 'opacity-70' : ''}`}>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{alert.title}</h3>
                              <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                                {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="rounded-full bg-secondary px-2 py-0.5">
                                {alert.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(alert.date)}
                              </span>
                            </div>
                            <p className="mt-2 text-sm">{alert.description}</p>
                          </div>
                          <div className="flex gap-2">
                            {!alert.isRead && (
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                              <span className="sr-only">Dismiss</span>
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
                        {searchQuery || categoryFilter !== "all" || priorityFilter !== "all"
                          ? "Try changing your search or filter criteria" 
                          : "You're all caught up! No pending alerts."}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 rounded-lg border p-6">
                  <h3 className="mb-4 text-base font-medium">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-md bg-amber-50 p-3">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-amber-500" />
                        <div>
                          <div className="font-medium text-amber-700">Farmer Subsidy Application</div>
                          <div className="text-sm text-amber-600">5 days remaining (Due: July 15, 2023)</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Apply Now</Button>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-md bg-red-50 p-3">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="font-medium text-red-700">Property Tax Payment</div>
                          <div className="text-sm text-red-600">2 days remaining (Due: July 12, 2023)</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Pay Now</Button>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-md bg-green-50 p-3">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="font-medium text-green-700">Scholarship Application</div>
                          <div className="text-sm text-green-600">48 days remaining (Due: August 30, 2023)</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Apply Now</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
                <CardDescription>
                  Customize the types of alerts you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 font-medium">Alert Categories</h3>
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-primary/10 p-2">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Subsidy Alerts</div>
                            <div className="text-sm text-muted-foreground">
                              Notifications about subsidy schemes and deadlines
                            </div>
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.subsidyAlerts}
                          onCheckedChange={() => handleTogglePreference('subsidyAlerts')}
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-primary/10 p-2">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Policy Changes</div>
                            <div className="text-sm text-muted-foreground">
                              Updates about government policy changes
                            </div>
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.policyChanges}
                          onCheckedChange={() => handleTogglePreference('policyChanges')}
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-primary/10 p-2">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Infrastructure Updates</div>
                            <div className="text-sm text-muted-foreground">
                              Information about roads, construction, and maintenance
                            </div>
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.infrastructureUpdates}
                          onCheckedChange={() => handleTogglePreference('infrastructureUpdates')}
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-primary/10 p-2">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Disaster Alerts</div>
                            <div className="text-sm text-muted-foreground">
                              Emergency notifications for floods, weather events, etc.
                            </div>
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.disasterAlerts}
                          onCheckedChange={() => handleTogglePreference('disasterAlerts')}
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-primary/10 p-2">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Education Notifications</div>
                            <div className="text-sm text-muted-foreground">
                              Updates about schools, scholarships, and programs
                            </div>
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.educationNotifications}
                          onCheckedChange={() => handleTogglePreference('educationNotifications')}
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-primary/10 p-2">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Healthcare Updates</div>
                            <div className="text-sm text-muted-foreground">
                              Information about health programs and camps
                            </div>
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.healthcareUpdates}
                          onCheckedChange={() => handleTogglePreference('healthcareUpdates')}
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-primary/10 p-2">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Employment Opportunities</div>
                            <div className="text-sm text-muted-foreground">
                              Job openings and employment schemes
                            </div>
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.employmentOpportunities}
                          onCheckedChange={() => handleTogglePreference('employmentOpportunities')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-4 font-medium">Notification Methods</h3>
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive alerts via email
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.emailNotifications}
                          onCheckedChange={() => handleTogglePreference('emailNotifications')}
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <div className="font-medium">SMS Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive alerts via SMS
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.smsNotifications}
                          onCheckedChange={() => handleTogglePreference('smsNotifications')}
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <div className="font-medium">Push Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive alerts on your device
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.pushNotifications}
                          onCheckedChange={() => handleTogglePreference('pushNotifications')}
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <div className="font-medium">Daily Digest</div>
                          <div className="text-sm text-muted-foreground">
                            Receive a summary of all alerts once a day
                          </div>
                        </div>
                        <Switch 
                          checked={preferences.dailyDigest}
                          onCheckedChange={() => handleTogglePreference('dailyDigest')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="location" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Settings</CardTitle>
                <CardDescription>
                  Customize alerts based on your geographic location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="font-medium">Use Current Location</h3>
                      <Switch 
                        checked={location.useCurrentLocation}
                        onCheckedChange={() => setLocation(prev => ({ 
                          ...prev, 
                          useCurrentLocation: !prev.useCurrentLocation 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">District</label>
                        <Select
                          value={location.district}
                          onValueChange={(value) => setLocation(prev => ({ ...prev, district: value }))}
                          disabled={location.useCurrentLocation}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mumbai">Mumbai</SelectItem>
                            <SelectItem value="Pune">Pune</SelectItem>
                            <SelectItem value="Nagpur">Nagpur</SelectItem>
                            <SelectItem value="Thane">Thane</SelectItem>
                            <SelectItem value="Nashik">Nashik</SelectItem>
                            <SelectItem value="Aurangabad">Aurangabad</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="mb-2 block text-sm font-medium">Taluka/Area</label>
                        <Select
                          value={location.taluka}
                          onValueChange={(value) => setLocation(prev => ({ ...prev, taluka: value }))}
                          disabled={location.useCurrentLocation}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select taluka/area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Andheri">Andheri</SelectItem>
                            <SelectItem value="Bandra">Bandra</SelectItem>
                            <SelectItem value="Borivali">Borivali</SelectItem>
                            <SelectItem value="Dadar">Dadar</SelectItem>
                            <SelectItem value="Malad">Malad</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          onClick={handleSaveLocation}
                          className="w-full sm:w-auto"
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          Save Location Preferences
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-6">
                    <h3 className="mb-4 font-medium">Location-Based Alert Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="local-events" className="h-4 w-4 rounded border-gray-300" checked />
                        <label htmlFor="local-events" className="text-sm">Local Government Events</label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="infrastructure" className="h-4 w-4 rounded border-gray-300" checked />
                        <label htmlFor="infrastructure" className="text-sm">Local Infrastructure Projects</label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="water-supply" className="h-4 w-4 rounded border-gray-300" checked />
                        <label htmlFor="water-supply" className="text-sm">Water Supply Updates</label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="weather" className="h-4 w-4 rounded border-gray-300" checked />
                        <label htmlFor="weather" className="text-sm">Local Weather Alerts</label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="traffic" className="h-4 w-4 rounded border-gray-300" checked />
                        <label htmlFor="traffic" className="text-sm">Traffic Updates</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border bg-secondary/30 p-6">
                    <div className="flex items-start gap-4">
                      <Settings className="mt-1 h-6 w-6 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">AI-Powered Location Intelligence</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Our AI system analyzes your location and activity patterns to provide highly relevant alerts. This helps you receive timely information about services and events in areas you frequently visit.
                        </p>
                      </div>
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

export default PersonalizedAlerts;
