
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Search,
  Upload,
  Clock,
  MessageSquare,
  PieChart,
  CheckCircle,
  AlertCircle,
  Loader2,
  XCircle,
  User,
  UploadCloud,
  Bell
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Mock data for grievances
const grievancesData = [
  {
    id: "GR001",
    title: "Water supply interruption in Andheri East",
    category: "Water Supply",
    status: "In Progress",
    priority: "High",
    submittedDate: "2024-05-10",
    estimatedResolution: "2024-05-15",
    description: "No water supply for the past 3 days in Andheri East, Building 7. Multiple families affected.",
  },
  {
    id: "GR002",
    title: "Damaged road in Pune Kothrud area",
    category: "Infrastructure",
    status: "Under Review",
    priority: "Medium",
    submittedDate: "2024-05-08",
    estimatedResolution: "2024-05-20",
    description: "Large potholes on main road causing traffic and accidents. Urgent repair needed.",
  },
  {
    id: "GR003",
    title: "Scholarship payment delay",
    category: "Education",
    status: "Assigned",
    priority: "Medium",
    submittedDate: "2024-05-05",
    estimatedResolution: "2024-05-18",
    description: "Scholarship amount for post-matric scheme not received for the last semester.",
  },
  {
    id: "GR004",
    title: "Incorrect property tax assessment",
    category: "Taxation",
    status: "Resolved",
    priority: "Low",
    submittedDate: "2024-04-25",
    estimatedResolution: "2024-05-10",
    description: "Property tax bill shows incorrect property size leading to higher taxation.",
  },
  {
    id: "GR005",
    title: "Streetlight not working in Nagpur West",
    category: "Infrastructure",
    status: "Resolved",
    priority: "Low",
    submittedDate: "2024-04-20",
    estimatedResolution: "2024-05-01",
    description: "Street lights in Nagpur West, near City Hospital have been non-functional for two weeks.",
  },
];

const Grievances = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Grievance submitted successfully", {
        description: "Your grievance has been registered with ID: GR006",
      });
      setActiveTab("track");
    }, 1500);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
      case "Medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"><Loader2 className="h-3 w-3" /> {status}</span>;
      case "Under Review":
        return <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800"><Clock className="h-3 w-3" /> {status}</span>;
      case "Assigned":
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800"><User className="h-3 w-3" /> {status}</span>;
      case "Resolved":
        return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"><CheckCircle className="h-3 w-3" /> {status}</span>;
      case "Rejected":
        return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800"><XCircle className="h-3 w-3" /> {status}</span>;
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"><AlertCircle className="h-3 w-3" /> {status}</span>;
    }
  };

  const filteredGrievances = grievancesData.filter(grievance => 
    grievance.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    grievance.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grievance.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewGrievanceDetails = (grievance: any) => {
    setSelectedGrievance(grievance);
    setDetailsOpen(true);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Smart Grievance Redressal</h1>
          <p className="text-muted-foreground">
            Submit and track your grievances with our AI-powered processing system
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="submit">Submit Grievance</TabsTrigger>
            <TabsTrigger value="track">Track Status</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Submit Grievance Tab */}
          <TabsContent value="submit" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit a New Grievance</CardTitle>
                <CardDescription>
                  Our AI system will automatically categorize, prioritize, and route your grievance for faster resolution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitGrievance}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <label htmlFor="grievanceTitle" className="text-sm font-medium">Grievance Title</label>
                      <Input 
                        id="grievanceTitle" 
                        placeholder="Provide a brief title for your grievance" 
                        required 
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <label htmlFor="category" className="text-sm font-medium">Category</label>
                      <Select required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="water">Water Supply</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="taxation">Taxation</SelectItem>
                          <SelectItem value="sanitation">Sanitation</SelectItem>
                          <SelectItem value="electricity">Electricity</SelectItem>
                          <SelectItem value="subsidy">Subsidy/Scheme</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-3">
                      <label htmlFor="location" className="text-sm font-medium">Location</label>
                      <Input 
                        id="location" 
                        placeholder="District, City, Area" 
                        required 
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <label htmlFor="description" className="text-sm font-medium">Detailed Description</label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your grievance in detail" 
                        className="min-h-[120px]" 
                        required 
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <label className="text-sm font-medium">Supporting Documents (Optional)</label>
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                        <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                        <p className="mb-1 text-sm font-medium">Upload supporting documents</p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Add photos, receipts, or any relevant documents that support your grievance
                        </p>
                        <Button type="button" variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Select Files
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      <label htmlFor="contact" className="text-sm font-medium">Contact Information</label>
                      <Input 
                        id="contact" 
                        placeholder="Mobile number or email for updates" 
                        required 
                      />
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="notifications" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="notifications" className="text-sm text-muted-foreground">
                          Receive SMS/email notifications about status updates
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Grievance"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Track Grievance Tab */}
          <TabsContent value="track" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Grievances</CardTitle>
                <CardDescription>
                  View the status and progress of your submitted grievances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID, title, or category..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Est. Resolution</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGrievances.length > 0 ? (
                        filteredGrievances.map((grievance) => (
                          <TableRow key={grievance.id} className="animate-fade-in">
                            <TableCell className="font-medium">{grievance.id}</TableCell>
                            <TableCell className="max-w-xs truncate">{grievance.title}</TableCell>
                            <TableCell>{grievance.category}</TableCell>
                            <TableCell>{getPriorityBadge(grievance.priority)}</TableCell>
                            <TableCell>{getStatusBadge(grievance.status)}</TableCell>
                            <TableCell>{new Date(grievance.estimatedResolution).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => viewGrievanceDetails(grievance)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex flex-col items-center">
                              <Search className="mb-2 h-10 w-10 text-muted-foreground" />
                              <p className="text-muted-foreground">No grievances found</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Grievance Details Dialog */}
                <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                  <DialogContent className="sm:max-w-[600px]">
                    {selectedGrievance && (
                      <>
                        <DialogHeader>
                          <DialogTitle>Grievance Details: {selectedGrievance.id}</DialogTitle>
                          <DialogDescription>
                            Submitted on {new Date(selectedGrievance.submittedDate).toLocaleDateString()}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-4">
                          <div>
                            <h3 className="text-lg font-medium">{selectedGrievance.title}</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {getStatusBadge(selectedGrievance.status)}
                              {getPriorityBadge(selectedGrievance.priority)}
                              <Badge variant="outline">{selectedGrievance.category}</Badge>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="mb-2 text-sm font-medium">Description</h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedGrievance.description}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="mb-1 text-sm font-medium">Submitted Date</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(selectedGrievance.submittedDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <h4 className="mb-1 text-sm font-medium">Estimated Resolution</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(selectedGrievance.estimatedResolution).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="mb-2 text-sm font-medium">Status Updates</h4>
                            <div className="space-y-3">
                              <div className="rounded-lg bg-primary/5 p-3">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                  <span>Ticket Created</span>
                                  <span className="ml-auto text-xs text-muted-foreground">
                                    {new Date(selectedGrievance.submittedDate).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  Your grievance has been successfully registered in our system.
                                </p>
                              </div>
                              
                              {selectedGrievance.status !== "Under Review" && (
                                <div className="rounded-lg bg-primary/5 p-3">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <User className="h-4 w-4 text-primary" />
                                    <span>Assigned to Department</span>
                                    <span className="ml-auto text-xs text-muted-foreground">
                                      {new Date(new Date(selectedGrievance.submittedDate).getTime() + 86400000).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Your grievance has been assigned to the {selectedGrievance.category} department.
                                  </p>
                                </div>
                              )}
                              
                              {selectedGrievance.status === "In Progress" || selectedGrievance.status === "Resolved" ? (
                                <div className="rounded-lg bg-primary/5 p-3">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <Loader2 className="h-4 w-4 text-primary" />
                                    <span>In Progress</span>
                                    <span className="ml-auto text-xs text-muted-foreground">
                                      {new Date(new Date(selectedGrievance.submittedDate).getTime() + 172800000).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Work has started on resolving your grievance.
                                  </p>
                                </div>
                              ) : null}
                              
                              {selectedGrievance.status === "Resolved" && (
                                <div className="rounded-lg bg-green-50 p-3">
                                  <div className="flex items-center gap-2 text-sm font-medium text-green-800">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>Resolved</span>
                                    <span className="ml-auto text-xs text-green-700/70">
                                      {new Date(selectedGrievance.estimatedResolution).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs text-green-700">
                                    Your grievance has been successfully resolved. Thank you for your patience.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter className="gap-2 sm:gap-0">
                          <Button 
                            variant="outline" 
                            onClick={() => setDetailsOpen(false)}
                          >
                            Close
                          </Button>
                          
                          {selectedGrievance.status !== "Resolved" && (
                            <Button 
                              onClick={() => {
                                toast.success("Reminder sent successfully", {
                                  description: "The department has been notified about your grievance.",
                                });
                                setDetailsOpen(false);
                              }}
                            >
                              <Bell className="mr-2 h-4 w-4" />
                              Send Reminder
                            </Button>
                          )}
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Grievance Analytics Dashboard</CardTitle>
                <CardDescription>
                  AI-powered insights on grievance resolution and efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-3">
                        <PieChart className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">78%</h3>
                        <p className="text-sm text-muted-foreground">Resolution Rate</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-3">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">8.3 Days</h3>
                        <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-amber-100 p-3">
                        <MessageSquare className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">2,456</h3>
                        <p className="text-sm text-muted-foreground">Total Grievances</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-6">
                  <h3 className="mb-6 text-lg font-medium">Top Grievance Categories</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Water Supply</span>
                        <span className="text-sm text-muted-foreground">35%</span>
                      </div>
                      <div className="h-2 rounded-full bg-primary/20">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Infrastructure</span>
                        <span className="text-sm text-muted-foreground">28%</span>
                      </div>
                      <div className="h-2 rounded-full bg-primary/20">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Sanitation</span>
                        <span className="text-sm text-muted-foreground">18%</span>
                      </div>
                      <div className="h-2 rounded-full bg-primary/20">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "18%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Electricity</span>
                        <span className="text-sm text-muted-foreground">12%</span>
                      </div>
                      <div className="h-2 rounded-full bg-primary/20">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "12%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Others</span>
                        <span className="text-sm text-muted-foreground">7%</span>
                      </div>
                      <div className="h-2 rounded-full bg-primary/20">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "7%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-medium">How NLP Automation Works</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <span className="font-bold">1</span>
                        </div>
                        <h4 className="font-medium">Classification</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Our AI automatically categorizes grievances based on textual analysis with 94% accuracy, routing them to the appropriate department.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <span className="font-bold">2</span>
                        </div>
                        <h4 className="font-medium">Prioritization</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Grievances are analyzed for urgency and impact, then assigned priority levels to ensure critical issues are addressed first.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <span className="font-bold">3</span>
                        </div>
                        <h4 className="font-medium">Resolution Prediction</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on historical data and the nature of the grievance, our AI provides accurate resolution time estimates.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-medium">Efficiency Improvements</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-green-600">53%</h4>
                      <p className="text-sm text-muted-foreground">
                        Faster resolution time compared to manual processing
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-green-600">96%</h4>
                      <p className="text-sm text-muted-foreground">
                        Accuracy in grievance categorization
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-green-600">31%</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduction in administrative workload
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

export default Grievances;
