
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  AlertTriangle,
  Search,
  Upload,
  UploadCloud,
  Shield,
  CheckCircle,
  Clock,
  XCircle,
  Activity,
  FileText,
  Camera
} from "lucide-react";

// Mock data for reported fraud
const reportedFraud = [
  {
    id: "F001",
    schemeType: "DBT Scholarship",
    date: "2023-11-15",
    status: "Under Investigation",
    description: "Duplicate claims for the same beneficiary in multiple locations",
  },
  {
    id: "F002",
    schemeType: "Subsidy Scheme",
    date: "2023-12-05",
    status: "Resolved",
    description: "False documentation provided for agricultural equipment subsidy",
  },
  {
    id: "F003",
    schemeType: "Pension Scheme",
    date: "2024-01-10",
    status: "Confirmed Fraud",
    description: "Ghost beneficiaries detected in rural pension distribution",
  },
  {
    id: "F004",
    schemeType: "Housing Subsidy",
    date: "2024-02-20",
    status: "Under Investigation",
    description: "Multiple housing subsidies claimed by the same family members",
  },
];

const FraudDetection = () => {
  const [activeTab, setActiveTab] = useState("report");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Fraud report submitted successfully", {
        description: "Our team will investigate and contact you if needed.",
      });
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Under Investigation") {
      return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800"><Clock className="h-3 w-3" /> {status}</span>;
    } else if (status === "Confirmed Fraud") {
      return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800"><XCircle className="h-3 w-3" /> {status}</span>;
    } else {
      return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"><CheckCircle className="h-3 w-3" /> {status}</span>;
    }
  };

  const filteredReports = reportedFraud.filter(report => 
    report.schemeType.toLowerCase().includes(searchQuery.toLowerCase()) || 
    report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">AI-Based Fraud Detection</h1>
          <p className="text-muted-foreground">
            Report and track potential fraud in MahaDBT and other subsidy schemes
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="report">Report Fraud</TabsTrigger>
            <TabsTrigger value="track">Track Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Suspected Fraud</CardTitle>
                <CardDescription>
                  Help us maintain the integrity of government subsidy schemes by reporting suspicious activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReportSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="scheme">Subsidy Scheme Type</Label>
                      <Select required>
                        <SelectTrigger id="scheme">
                          <SelectValue placeholder="Select scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scholarship">Scholarship Schemes</SelectItem>
                          <SelectItem value="agriculture">Agricultural Subsidies</SelectItem>
                          <SelectItem value="housing">Housing Schemes</SelectItem>
                          <SelectItem value="pension">Pension Schemes</SelectItem>
                          <SelectItem value="healthcare">Healthcare Benefits</SelectItem>
                          <SelectItem value="other">Other MahaDBT Schemes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="District, Taluka, Village" required />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description of Suspected Fraud</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe what you have observed and why you believe it may be fraudulent" 
                        className="min-h-[120px]" 
                        required 
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label>Evidence (Optional)</Label>
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                          <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                          <p className="mb-1 text-sm font-medium">Upload Documents</p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Provide any supporting documents as evidence (images, PDFs, etc.)
                          </p>
                          <div className="flex gap-3">
                            <Button type="button" variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              Upload File
                            </Button>
                            <Button type="button" variant="outline" size="sm">
                              <Camera className="mr-2 h-4 w-4" />
                              Take Photo
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="contact">Your Contact Information (Optional)</Label>
                      <Input id="contact" placeholder="Email or phone number" />
                      <p className="text-xs text-muted-foreground">
                        Your information will remain confidential and will only be used if additional details are needed
                      </p>
                    </div>
                    
                    <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800">Important Notice</h4>
                          <p className="text-sm text-amber-700">
                            Making false allegations with malicious intent is punishable under law. Please ensure your report is made in good faith based on reasonable suspicion.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Report"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Track Fraud Reports</CardTitle>
                <CardDescription>
                  Check the status of your submitted reports or view publicly available fraud cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID, scheme type, or description..."
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
                        <TableHead>Report ID</TableHead>
                        <TableHead>Scheme Type</TableHead>
                        <TableHead>Reported On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                          <TableRow key={report.id} className="animate-fade-in">
                            <TableCell className="font-medium">{report.id}</TableCell>
                            <TableCell>{report.schemeType}</TableCell>
                            <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                            <TableCell>{getStatusBadge(report.status)}</TableCell>
                            <TableCell className="max-w-xs truncate">{report.description}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <div className="flex flex-col items-center">
                              <Search className="mb-2 h-10 w-10 text-muted-foreground" />
                              <p className="text-muted-foreground">No reports found</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-8 rounded-lg border p-6">
                  <div className="text-center">
                    <Shield className="mx-auto mb-4 h-16 w-16 text-primary/60" />
                    <h3 className="mb-2 text-xl font-medium">How AI Fraud Detection Works</h3>
                    <p className="mx-auto max-w-md text-muted-foreground">
                      Our AI-powered system analyzes patterns and anomalies across subsidy distribution data to identify potential fraud cases.
                    </p>
                  </div>
                  
                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Upload className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 font-medium">Report Collection</h4>
                      <p className="text-sm text-muted-foreground">
                        Citizens submit reports with evidence of suspicious activities
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Activity className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 font-medium">AI Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Our AI analyzes the data, cross-references with databases, and identifies patterns
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 font-medium">Verification & Action</h4>
                      <p className="text-sm text-muted-foreground">
                        Officials verify flagged cases and take appropriate legal action
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

export default FraudDetection;
