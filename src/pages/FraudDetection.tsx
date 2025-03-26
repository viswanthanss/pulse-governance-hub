
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
  AlertTriangle,
  FileText,
  Search,
  Upload,
  Shield,
  Check,
  Clock,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

// Mock data for existing reports
const existingReports = [
  {
    id: "FR20230001",
    title: "Duplicate Beneficiary Claims",
    scheme: "Farmer Loan Waiver Scheme",
    status: "Under Investigation",
    dateSubmitted: "2023-08-15",
    description: "Multiple accounts receiving benefits under same Aadhaar number.",
    evidenceCount: 2
  },
  {
    id: "FR20230015",
    title: "Ghost Beneficiary",
    scheme: "Scholarship Scheme",
    status: "Verified",
    dateSubmitted: "2023-09-22", 
    description: "Benefits being claimed for a non-existent student.",
    evidenceCount: 3
  },
  {
    id: "FR20230023",
    title: "Document Falsification",
    scheme: "Housing Subsidy",
    status: "Resolved",
    dateSubmitted: "2023-07-05",
    description: "Falsified income certificate submitted for housing subsidy.",
    evidenceCount: 4
  }
];

const FraudDetection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newReport, setNewReport] = useState({
    title: "",
    scheme: "",
    description: "",
    location: "",
    attachments: [] as File[]
  });
  
  const filteredReports = existingReports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      report.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewReport(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewReport(prev => ({ 
        ...prev, 
        attachments: [...prev.attachments, ...Array.from(e.target.files as FileList)]
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to your backend
    console.log("Submitting report:", newReport);
    
    toast.success("Fraud report submitted successfully", {
      description: "Your report has been registered with ID: FR20230045",
    });
    
    // Reset form
    setNewReport({
      title: "",
      scheme: "",
      description: "",
      location: "",
      attachments: []
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "text-green-500";
      case "under investigation":
      case "verified":
        return "text-amber-500";
      default:
        return "text-red-500";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return <Check className="h-4 w-4" />;
      case "under investigation":
      case "verified":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">AI-Based Fraud Detection</h1>
          <p className="text-muted-foreground">
            Report suspected fraud in government subsidy schemes with our AI detection system
          </p>
        </div>
        
        <Tabs defaultValue="track" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="track">Track Reports</TabsTrigger>
            <TabsTrigger value="submit">Submit New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="track" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Fraud Reports</CardTitle>
                <CardDescription>
                  View and track the status of your submitted reports
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
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="under investigation">Under Investigation</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <div key={report.id} className="rounded-lg border p-4 animate-fade-in">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{report.title}</h3>
                              <div className="rounded-full border px-2 py-0.5 text-xs">
                                {report.evidenceCount} Evidence Files
                              </div>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {report.id} • {report.scheme}
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-sm">Submitted on</div>
                              <div className="font-medium">{new Date(report.dateSubmitted).toLocaleDateString()}</div>
                            </div>
                            <div className={`flex items-center gap-1 ${getStatusColor(report.status)}`}>
                              {getStatusIcon(report.status)}
                              <span className="font-medium">{report.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm">{report.description}</div>
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
                      <h3 className="text-lg font-medium">No reports found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {searchQuery || statusFilter !== "all" 
                          ? "Try changing your search or filter criteria" 
                          : "You haven't submitted any fraud reports yet"}
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
                <CardTitle>Submit Fraud Report</CardTitle>
                <CardDescription>
                  Report suspected fraud in government subsidy schemes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="title">Report Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Briefly describe the suspected fraud"
                        value={newReport.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="scheme">Subsidy Scheme</Label>
                      <Select
                        value={newReport.scheme}
                        onValueChange={(value) => setNewReport(prev => ({ ...prev, scheme: value }))}
                      >
                        <SelectTrigger id="scheme">
                          <SelectValue placeholder="Select the relevant scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="farmer">Farmer Loan Waiver Scheme</SelectItem>
                          <SelectItem value="scholarship">Scholarship Scheme</SelectItem>
                          <SelectItem value="housing">Housing Subsidy</SelectItem>
                          <SelectItem value="pension">Pension Scheme</SelectItem>
                          <SelectItem value="employment">Employment Guarantee Scheme</SelectItem>
                          <SelectItem value="food">Food Subsidy Scheme</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Provide a detailed description of the suspected fraud"
                        rows={5}
                        value={newReport.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Enter the location where fraud is suspected"
                        value={newReport.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="attachments">Evidence (Required)</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Evidence
                        </Button>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          multiple
                        />
                        <span className="text-sm text-muted-foreground">
                          {newReport.attachments.length > 0 
                            ? `${newReport.attachments.length} file(s) selected` 
                            : "No files selected"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You can upload images, documents, or videos as evidence (max 5MB each)
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Submit Report</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col items-start border-t px-6 py-4">
                <h4 className="font-medium">What happens next?</h4>
                <p className="text-sm text-muted-foreground">
                  Once submitted, our AI will analyze your report and evidence to verify the authenticity of the fraud claim. You'll receive regular updates on the investigation progress. All reports are handled with strict confidentiality.
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

export default FraudDetection;
