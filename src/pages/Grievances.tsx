
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  FileText, 
  Upload,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

// Mock data for existing grievances
const existingGrievances = [
  {
    id: "GR20230001",
    title: "Water Supply Interruption",
    department: "Municipal Water Department",
    status: "In Progress",
    priority: "Medium",
    dateSubmitted: "2023-09-05",
    estimatedResolution: "2023-09-20",
    description: "Frequent water supply interruptions in Andheri East area for the past 2 weeks."
  },
  {
    id: "GR20230015",
    title: "Pothole on Main Road",
    department: "Road Transport Department",
    status: "Assigned",
    priority: "High",
    dateSubmitted: "2023-09-10",
    estimatedResolution: "2023-09-18",
    description: "Large pothole on SV Road near Goregaon station causing traffic and accidents."
  },
  {
    id: "GR20230023",
    title: "Pension Payment Delay",
    department: "Social Welfare Department",
    status: "Resolved",
    priority: "High",
    dateSubmitted: "2023-08-15",
    estimatedResolution: "2023-09-01",
    description: "Not received pension payment for August 2023."
  }
];

const Grievances = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newGrievance, setNewGrievance] = useState({
    title: "",
    department: "",
    description: "",
    location: "",
    attachments: [] as File[]
  });
  
  const filteredGrievances = existingGrievances.filter(grievance => {
    const matchesSearch = 
      grievance.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grievance.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      grievance.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewGrievance(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewGrievance(prev => ({ 
        ...prev, 
        attachments: [...prev.attachments, ...Array.from(e.target.files as FileList)]
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to your backend
    console.log("Submitting grievance:", newGrievance);
    
    toast.success("Grievance submitted successfully", {
      description: "Your grievance has been registered with ID: GR20230045",
    });
    
    // Reset form
    setNewGrievance({
      title: "",
      department: "",
      description: "",
      location: "",
      attachments: []
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "text-green-500";
      case "in progress":
      case "assigned":
        return "text-amber-500";
      default:
        return "text-red-500";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "in progress":
      case "assigned":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Smart Grievance Redressal</h1>
          <p className="text-muted-foreground">
            Submit and track your complaints with our AI-powered grievance management system.
          </p>
        </div>
        
        <Tabs defaultValue="track" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="track">Track Grievances</TabsTrigger>
            <TabsTrigger value="submit">Submit New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="track" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Grievances</CardTitle>
                <CardDescription>
                  View and track the status of your submitted grievances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID or title..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredGrievances.length > 0 ? (
                    filteredGrievances.map((grievance) => (
                      <div key={grievance.id} className="rounded-lg border p-4 animate-fade-in">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{grievance.title}</h3>
                              <div className="rounded-full border px-2 py-0.5 text-xs">
                                {grievance.priority} Priority
                              </div>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {grievance.id} • {grievance.department}
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-sm">Submitted on</div>
                              <div className="font-medium">{new Date(grievance.dateSubmitted).toLocaleDateString()}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">Estimated resolution</div>
                              <div className="font-medium">{new Date(grievance.estimatedResolution).toLocaleDateString()}</div>
                            </div>
                            <div className={`flex items-center gap-1 ${getStatusColor(grievance.status)}`}>
                              {getStatusIcon(grievance.status)}
                              <span className="font-medium">{grievance.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm">{grievance.description}</div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <FileText className="mb-2 h-10 w-10 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No grievances found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {searchQuery || statusFilter !== "all" 
                          ? "Try changing your search or filter criteria" 
                          : "You haven't submitted any grievances yet"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="submit" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit New Grievance</CardTitle>
                <CardDescription>
                  File a new complaint with the relevant department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="title">Grievance Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Briefly describe your issue"
                        value={newGrievance.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={newGrievance.department}
                        onValueChange={(value) => setNewGrievance(prev => ({ ...prev, department: value }))}
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select the relevant department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="water">Municipal Water Department</SelectItem>
                          <SelectItem value="roads">Road Transport Department</SelectItem>
                          <SelectItem value="electricity">Electricity Department</SelectItem>
                          <SelectItem value="sanitation">Sanitation Department</SelectItem>
                          <SelectItem value="revenue">Revenue Department</SelectItem>
                          <SelectItem value="education">Education Department</SelectItem>
                          <SelectItem value="health">Health Department</SelectItem>
                          <SelectItem value="social">Social Welfare Department</SelectItem>
                          <SelectItem value="police">Police Department</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Provide a detailed description of your grievance"
                        rows={5}
                        value={newGrievance.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Enter the location related to your grievance"
                        value={newGrievance.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="attachments">Attachments (Optional)</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Files
                        </Button>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          multiple
                        />
                        <span className="text-sm text-muted-foreground">
                          {newGrievance.attachments.length > 0 
                            ? `${newGrievance.attachments.length} file(s) selected` 
                            : "No files selected"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You can upload images, documents, or videos related to your grievance (max 5MB each)
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Submit Grievance</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col items-start border-t px-6 py-4">
                <h4 className="font-medium">What happens next?</h4>
                <p className="text-sm text-muted-foreground">
                  Once submitted, our AI will analyze and categorize your grievance, assign it a priority level, and route it to the appropriate department. You'll receive an email confirmation with tracking details.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Simple Label component to match the form style
const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    {children}
  </label>
);

export default Grievances;
