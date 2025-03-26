
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import DocumentItem from "@/components/DocumentItem";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Upload, 
  Search, 
  FileText, 
  Shield, 
  UploadCloud,
  PlusCircle
} from "lucide-react";
import { toast } from "sonner";

// Mock data for existing documents
const existingDocuments = [
  {
    id: "doc1",
    title: "Aadhar Card",
    type: "Identity Proof",
    issuedDate: "15 Jun 2020",
    verificationStatus: "verified" as const
  },
  {
    id: "doc2",
    title: "Land Records (7/12 Extract)",
    type: "Property Document",
    issuedDate: "03 Aug 2022",
    verificationStatus: "verified" as const
  },
  {
    id: "doc3",
    title: "Income Certificate",
    type: "Financial Document",
    issuedDate: "22 Jan 2023",
    verificationStatus: "pending" as const
  },
  {
    id: "doc4",
    title: "Driving License",
    type: "Identity Proof",
    issuedDate: "10 Mar 2021",
    verificationStatus: "verified" as const
  },
  {
    id: "doc5",
    title: "Property Tax Receipt",
    type: "Financial Document",
    issuedDate: "05 Apr 2023",
    verificationStatus: "pending" as const
  }
];

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [documentFilter, setDocumentFilter] = useState("all");
  
  const filteredDocuments = existingDocuments.filter(document => {
    const matchesSearch = 
      document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      documentFilter === "all" || 
      document.type.toLowerCase().includes(documentFilter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });
  
  const handleVerifyDocument = () => {
    // In a real app, this would send the data to your backend
    toast.success("Document submitted for verification", {
      description: "You'll be notified once the verification is complete",
    });
    setVerificationDialogOpen(false);
  };
  
  const handleUploadDocument = () => {
    // In a real app, this would upload the document
    toast.success("Document uploaded successfully", {
      description: "Your document has been added to your digital wallet",
    });
    setUploadDialogOpen(false);
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Digital Document Wallet</h1>
          <p className="text-muted-foreground">
            Securely store, verify, and access your government documents
          </p>
        </div>
        
        <Tabs defaultValue="wallet" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="wallet">My Documents</TabsTrigger>
            <TabsTrigger value="verify">Verify Document</TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallet" className="mt-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>My Document Wallet</CardTitle>
                  <CardDescription>
                    Access and manage all your verified documents
                  </CardDescription>
                </div>
                <div className="mt-4 flex gap-3 sm:mt-0">
                  <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Document
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload New Document</DialogTitle>
                        <DialogDescription>
                          Add a new document to your digital wallet
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Document Type</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="identity">Identity Proof</SelectItem>
                              <SelectItem value="property">Property Document</SelectItem>
                              <SelectItem value="financial">Financial Document</SelectItem>
                              <SelectItem value="education">Educational Certificate</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Document Title</label>
                          <Input placeholder="E.g., Aadhar Card, Birth Certificate" />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Issue Date</label>
                          <Input type="date" />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Upload Document</label>
                          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                            <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                            <p className="mb-1 text-sm font-medium">Drag and drop or click to upload</p>
                            <p className="text-xs text-muted-foreground">
                              Supports JPG, PNG, PDF (max 5MB)
                            </p>
                            <Button variant="outline" className="mt-4">
                              <Upload className="mr-2 h-4 w-4" />
                              Select File
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUploadDocument}>Upload Document</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={documentFilter}
                      onValueChange={setDocumentFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Documents</SelectItem>
                        <SelectItem value="identity">Identity Proofs</SelectItem>
                        <SelectItem value="property">Property Documents</SelectItem>
                        <SelectItem value="financial">Financial Documents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((document) => (
                      <DocumentItem
                        key={document.id}
                        id={document.id}
                        title={document.title}
                        type={document.type}
                        issuedDate={document.issuedDate}
                        verificationStatus={document.verificationStatus}
                        className="animate-fade-in"
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <FileText className="mb-2 h-10 w-10 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No documents found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {searchQuery || documentFilter !== "all" 
                          ? "Try changing your search or filter criteria" 
                          : "Upload your first document to get started"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="verify" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Verify a Document</CardTitle>
                <CardDescription>
                  Use our AI-powered verification system to authenticate documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-center sm:w-auto">
                      <Shield className="mr-2 h-4 w-4" />
                      Start Verification Process
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Document Verification</DialogTitle>
                      <DialogDescription>
                        Upload a document for AI-based verification
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Document Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aadhar">Aadhar Card</SelectItem>
                            <SelectItem value="pan">PAN Card</SelectItem>
                            <SelectItem value="voter">Voter ID</SelectItem>
                            <SelectItem value="land">Land Records</SelectItem>
                            <SelectItem value="income">Income Certificate</SelectItem>
                            <SelectItem value="caste">Caste Certificate</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Document Number (Optional)</label>
                        <Input placeholder="Enter document number for faster verification" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Upload Document</label>
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                          <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                          <p className="mb-1 text-sm font-medium">Drag and drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">
                            Supports JPG, PNG, PDF (max 5MB)
                          </p>
                          <Button variant="outline" className="mt-4">
                            <Upload className="mr-2 h-4 w-4" />
                            Select File
                          </Button>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Additional Comments (Optional)</label>
                        <Textarea placeholder="Provide any additional context for verification" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setVerificationDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleVerifyDocument}>Verify Document</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <div className="mt-8 rounded-lg border p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <Shield className="mx-auto mb-4 h-16 w-16 text-primary/60" />
                      <h3 className="mb-2 text-xl font-medium">How Verification Works</h3>
                      <p className="mx-auto max-w-md text-muted-foreground">
                        Our AI-powered verification system checks your documents against official government records to ensure authenticity.
                      </p>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="rounded-lg border bg-card p-4 text-center">
                        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <span className="font-semibold">1</span>
                        </div>
                        <h4 className="mb-2 font-medium">Upload Document</h4>
                        <p className="text-sm text-muted-foreground">
                          Scan or take a clear photo of your document
                        </p>
                      </div>
                      
                      <div className="rounded-lg border bg-card p-4 text-center">
                        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <span className="font-semibold">2</span>
                        </div>
                        <h4 className="mb-2 font-medium">AI Processing</h4>
                        <p className="text-sm text-muted-foreground">
                          Our AI analyzes the document for authenticity
                        </p>
                      </div>
                      
                      <div className="rounded-lg border bg-card p-4 text-center">
                        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <span className="font-semibold">3</span>
                        </div>
                        <h4 className="mb-2 font-medium">Verified Result</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive verification status and add to your wallet
                        </p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <p className="text-sm">
                        <span className="font-medium">Privacy Note:</span> All documents are encrypted and processed securely. We comply with data protection regulations and your documents are never shared without your consent.
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

export default Documents;
