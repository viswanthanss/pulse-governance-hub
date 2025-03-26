
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
  Users,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  Upload,
  MapPin,
  Camera,
  Star,
  Clock,
  AlertTriangle,
  Buildings,
  Road,
  Trash2,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";

// Mock data for forum posts
const forumPosts = [
  {
    id: "post-1",
    title: "Water supply issues in Malad West",
    author: "Rajesh Sharma",
    content: "There has been irregular water supply in Malad West for the past week. Is anyone else facing similar issues?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    likes: 24,
    comments: 15,
    category: "Water Supply"
  },
  {
    id: "post-2",
    title: "Need traffic management at Andheri Junction",
    author: "Priya Patel",
    content: "The traffic situation at Andheri Junction is getting worse every day. Can we request the authorities to place traffic police during peak hours?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    likes: 42,
    comments: 28,
    category: "Traffic"
  },
  {
    id: "post-3",
    title: "Appreciation for the new waste collection system",
    author: "Mohammed Khan",
    content: "I want to appreciate the new waste collection system implemented in our area. It's much more efficient and timely.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    likes: 56,
    comments: 8,
    category: "Sanitation"
  },
  {
    id: "post-4",
    title: "Request for a new playground in Thane East",
    author: "Anita Desai",
    content: "Our community needs a playground for children. There's vacant land near the municipal office that could be developed.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 36 hours ago
    likes: 78,
    comments: 32,
    category: "Infrastructure"
  }
];

// Mock data for issue reports
const issueReports = [
  {
    id: "issue-1",
    title: "Pothole on SV Road",
    category: "Roads",
    status: "In Progress",
    location: "SV Road, near Goregaon Station",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    upvotes: 45,
    hasImage: true
  },
  {
    id: "issue-2",
    title: "Street light not working",
    category: "Electricity",
    status: "Pending",
    location: "Lane 4, Bandra West",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 32).toISOString(), // 32 hours ago
    upvotes: 12,
    hasImage: true
  },
  {
    id: "issue-3",
    title: "Garbage dumping",
    category: "Sanitation",
    status: "Resolved",
    location: "Behind City Mall, Andheri East",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    upvotes: 28,
    hasImage: true
  },
  {
    id: "issue-4",
    title: "Broken footpath",
    category: "Infrastructure",
    status: "Assigned",
    location: "MG Road, Fort Area",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    upvotes: 19,
    hasImage: false
  }
];

// Mock data for service ratings
const serviceRatings = [
  {
    id: "service-1",
    name: "Water Supply Department",
    averageRating: 3.5,
    totalRatings: 1245,
    improvement: "+0.3",
    isImproved: true
  },
  {
    id: "service-2",
    name: "Road Transport Department",
    averageRating: 2.8,
    totalRatings: 987,
    improvement: "-0.2",
    isImproved: false
  },
  {
    id: "service-3",
    name: "Electricity Department",
    averageRating: 4.1,
    totalRatings: 1567,
    improvement: "+0.5",
    isImproved: true
  },
  {
    id: "service-4",
    name: "Sanitation Department",
    averageRating: 3.2,
    totalRatings: 1102,
    improvement: "+0.1",
    isImproved: true
  },
  {
    id: "service-5",
    name: "Public Health Department",
    averageRating: 3.9,
    totalRatings: 856,
    improvement: "+0.2",
    isImproved: true
  }
];

const CommunityEngagement = () => {
  const [forumSearchQuery, setForumSearchQuery] = useState("");
  const [forumCategoryFilter, setForumCategoryFilter] = useState("all");
  const [issueSearchQuery, setIssueSearchQuery] = useState("");
  const [issueCategoryFilter, setIssueCategoryFilter] = useState("all");
  const [issueStatusFilter, setIssueStatusFilter] = useState("all");
  
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: ""
  });
  
  const [newIssue, setNewIssue] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    attachments: [] as File[]
  });
  
  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(forumSearchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(forumSearchQuery.toLowerCase());
    
    const matchesCategory = 
      forumCategoryFilter === "all" || 
      post.category.toLowerCase() === forumCategoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  const filteredIssues = issueReports.filter(issue => {
    const matchesSearch = 
      issue.title.toLowerCase().includes(issueSearchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(issueSearchQuery.toLowerCase());
    
    const matchesCategory = 
      issueCategoryFilter === "all" || 
      issue.category.toLowerCase() === issueCategoryFilter.toLowerCase();
    
    const matchesStatus = 
      issueStatusFilter === "all" || 
      issue.status.toLowerCase() === issueStatusFilter.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting new post:", newPost);
    
    toast.success("Post submitted successfully", {
      description: "Your post has been published to the community forum",
    });
    
    setNewPost({
      title: "",
      content: "",
      category: ""
    });
  };
  
  const handleNewIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting new issue:", newIssue);
    
    toast.success("Issue reported successfully", {
      description: "Your issue has been reported and will be addressed soon",
    });
    
    setNewIssue({
      title: "",
      category: "",
      description: "",
      location: "",
      attachments: []
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewIssue(prev => ({ 
        ...prev, 
        attachments: [...prev.attachments, ...Array.from(e.target.files as FileList)]
      }));
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, form: 'post' | 'issue') => {
    const { name, value } = e.target;
    
    if (form === 'post') {
      setNewPost(prev => ({ ...prev, [name]: value }));
    } else {
      setNewIssue(prev => ({ ...prev, [name]: value }));
    }
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
  
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {halfStar && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />
        ))}
      </div>
    );
  };
  
  const getIssueStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return <div className="h-2 w-2 rounded-full bg-green-500" />;
      case "in progress":
      case "assigned":
        return <div className="h-2 w-2 rounded-full bg-amber-500" />;
      case "pending":
        return <div className="h-2 w-2 rounded-full bg-red-500" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-slate-500" />;
    }
  };
  
  const getIssueCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "roads":
        return <Road className="h-4 w-4" />;
      case "electricity":
        return <Lightbulb className="h-4 w-4" />;
      case "sanitation":
        return <Trash2 className="h-4 w-4" />;
      case "infrastructure":
        return <Buildings className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Community Engagement Portal</h1>
          <p className="text-muted-foreground">
            Connect with your community, report issues, and rate government services
          </p>
        </div>
        
        <Tabs defaultValue="forum" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="forum">Citizen Forum</TabsTrigger>
            <TabsTrigger value="issues">Report Issues</TabsTrigger>
            <TabsTrigger value="ratings">Service Ratings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="forum" className="mt-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Community Discussion Forum</CardTitle>
                  <CardDescription>
                    Discuss local issues, share ideas, and connect with your community
                  </CardDescription>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Create New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search discussions..."
                      className="pl-8"
                      value={forumSearchQuery}
                      onChange={(e) => setForumSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={forumCategoryFilter}
                      onValueChange={setForumCategoryFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="water supply">Water Supply</SelectItem>
                        <SelectItem value="traffic">Traffic</SelectItem>
                        <SelectItem value="sanitation">Sanitation</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="electricity">Electricity</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-8 space-y-4">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div key={post.id} className="rounded-lg border p-4 animate-fade-in">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{post.title}</h3>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>{formatTimeAgo(post.timestamp)}</span>
                              <span>•</span>
                              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                                {post.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{post.content}</p>
                        <div className="mt-4 flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments} Comments</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <MessageSquare className="mb-2 h-10 w-10 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No discussions found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {forumSearchQuery || forumCategoryFilter !== "all" 
                          ? "Try changing your search or filter criteria" 
                          : "Be the first to start a discussion in your community"}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-medium">Start a New Discussion</h3>
                  <form onSubmit={handleNewPostSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Discussion Title</Label>
                        <Input 
                          id="title"
                          name="title"
                          placeholder="Enter a clear, specific title"
                          className="mt-1"
                          value={newPost.title}
                          onChange={(e) => handleInputChange(e, 'post')}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="post-category">Category</Label>
                        <Select
                          value={newPost.category}
                          onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger id="post-category" className="mt-1">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="water supply">Water Supply</SelectItem>
                            <SelectItem value="traffic">Traffic</SelectItem>
                            <SelectItem value="sanitation">Sanitation</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="electricity">Electricity</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="content">Discussion Details</Label>
                        <Textarea
                          id="content"
                          name="content"
                          placeholder="Describe your discussion topic in detail"
                          rows={5}
                          className="mt-1"
                          value={newPost.content}
                          onChange={(e) => handleInputChange(e, 'post')}
                          required
                        />
                      </div>
                      
                      <div className="pt-3 text-right">
                        <Button type="submit">Post Discussion</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="issues" className="mt-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Community Issue Reporting</CardTitle>
                  <CardDescription>
                    Report local infrastructure problems, illegal activities, and other issues
                  </CardDescription>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report New Issue
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reported issues..."
                      className="pl-8"
                      value={issueSearchQuery}
                      onChange={(e) => setIssueSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                    <Select
                      value={issueCategoryFilter}
                      onValueChange={setIssueCategoryFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="roads">Roads</SelectItem>
                        <SelectItem value="electricity">Electricity</SelectItem>
                        <SelectItem value="sanitation">Sanitation</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={issueStatusFilter}
                      onValueChange={setIssueStatusFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  {filteredIssues.length > 0 ? (
                    filteredIssues.map((issue) => (
                      <div key={issue.id} className="rounded-lg border p-4 animate-fade-in">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                {getIssueCategoryIcon(issue.category)}
                              </div>
                              <h3 className="font-semibold">{issue.title}</h3>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{issue.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium">
                            {getIssueStatusIcon(issue.status)}
                            <span>{issue.status}</span>
                          </div>
                        </div>
                        
                        {issue.hasImage && (
                          <div className="mt-3 h-36 rounded-md bg-muted flex items-center justify-center">
                            <Camera className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeAgo(issue.timestamp)}</span>
                          </div>
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{issue.upvotes}</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <AlertTriangle className="mb-2 h-10 w-10 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No issues found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {issueSearchQuery || issueCategoryFilter !== "all" || issueStatusFilter !== "all"
                          ? "Try changing your search or filter criteria" 
                          : "No issues have been reported in your area yet"}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-medium">Report a New Issue</h3>
                  <form onSubmit={handleNewIssueSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="issue-title">Issue Title</Label>
                        <Input 
                          id="issue-title"
                          name="title"
                          placeholder="Briefly describe the issue"
                          className="mt-1"
                          value={newIssue.title}
                          onChange={(e) => handleInputChange(e, 'issue')}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="issue-category">Category</Label>
                        <Select
                          value={newIssue.category}
                          onValueChange={(value) => setNewIssue(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger id="issue-category" className="mt-1">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="roads">Roads</SelectItem>
                            <SelectItem value="electricity">Electricity</SelectItem>
                            <SelectItem value="sanitation">Sanitation</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="water">Water Supply</SelectItem>
                            <SelectItem value="illegal">Illegal Activity</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="issue-description">Issue Description</Label>
                        <Textarea
                          id="issue-description"
                          name="description"
                          placeholder="Provide details about the issue"
                          rows={3}
                          className="mt-1"
                          value={newIssue.description}
                          onChange={(e) => handleInputChange(e, 'issue')}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="issue-location">Location</Label>
                        <Input 
                          id="issue-location"
                          name="location"
                          placeholder="Enter the exact location of the issue"
                          className="mt-1"
                          value={newIssue.location}
                          onChange={(e) => handleInputChange(e, 'issue')}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="issue-photos">Photos (Optional)</Label>
                        <div className="mt-1 flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("issue-upload")?.click()}
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Upload Photos
                          </Button>
                          <Input
                            id="issue-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                            accept="image/*"
                          />
                          <span className="text-sm text-muted-foreground">
                            {newIssue.attachments.length > 0 
                              ? `${newIssue.attachments.length} photo(s) selected` 
                              : "No photos selected"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="pt-3 text-right">
                        <Button type="submit">Submit Report</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ratings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rate Government Services</CardTitle>
                <CardDescription>
                  Provide feedback on government departments and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 text-left font-medium">Department/Service</th>
                        <th className="pb-3 text-left font-medium">Rating</th>
                        <th className="pb-3 text-left font-medium">Total Reviews</th>
                        <th className="pb-3 text-left font-medium">Trend</th>
                        <th className="pb-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceRatings.map((service) => (
                        <tr key={service.id} className="border-b">
                          <td className="py-4 font-medium">{service.name}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              {renderStars(service.averageRating)}
                              <span>{service.averageRating.toFixed(1)}/5</span>
                            </div>
                          </td>
                          <td className="py-4">{service.totalRatings.toLocaleString()} ratings</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center ${service.isImproved ? "text-green-500" : "text-red-500"}`}>
                              {service.isImproved ? (
                                <ThumbsUp className="mr-1 h-3 w-3" />
                              ) : (
                                <ThumbsDown className="mr-1 h-3 w-3" />
                              )}
                              {service.improvement}
                            </span>
                          </td>
                          <td className="py-4">
                            <Button variant="outline" size="sm">Rate Now</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-medium">Citizen Feedback Analysis</h3>
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Highest Rated</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-lg font-medium">Electricity Department</div>
                          <div className="flex items-center gap-2">
                            {renderStars(4.1)}
                            <span className="text-sm">4.1/5</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Needs Improvement</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-lg font-medium">Road Transport Department</div>
                          <div className="flex items-center gap-2">
                            {renderStars(2.8)}
                            <span className="text-sm">2.8/5</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Most Improved</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-lg font-medium">Electricity Department</div>
                          <div className="text-sm text-green-500">+0.5 points in 3 months</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h4 className="mb-2 font-medium">Key Insights from Feedback</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                          <span>Water Supply Department has seen consistent improvement over the past 6 months due to new management protocols.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500"></div>
                          <span>Road Transport Department needs to focus on road maintenance and traffic management based on citizen feedback.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Our AI analysis shows that departments with frequent community engagement score 1.2 points higher on average.</span>
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

// Simple Label component to match the form style
const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    {children}
  </label>
);

export default CommunityEngagement;
