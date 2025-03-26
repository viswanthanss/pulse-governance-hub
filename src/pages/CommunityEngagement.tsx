
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  ThumbsUp,
  MessageSquare,
  Upload,
  BarChart,
  Star,
  Users,
  Camera,
  Building,
  FileText,
  Trash2,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  MapPin,
  Clock,
  User,
  Menu
} from "lucide-react";

// Mock data for community posts
const communityPosts = [
  {
    id: "post1",
    author: "Rahul Sharma",
    avatar: "https://i.pravatar.cc/150?img=1",
    date: "2 hours ago",
    content: "The new road construction in Koregaon Park is causing severe traffic jams. Can authorities provide an estimated completion timeline?",
    likes: 24,
    comments: 8,
    category: "Infrastructure"
  },
  {
    id: "post2",
    author: "Priya Desai",
    avatar: "https://i.pravatar.cc/150?img=2",
    date: "Yesterday",
    content: "The water supply in Aundh has been irregular for the past week. Multiple complaints have been submitted but no action taken yet.",
    likes: 42,
    comments: 15,
    category: "Water Supply"
  },
  {
    id: "post3",
    author: "Amit Joshi",
    avatar: "https://i.pravatar.cc/150?img=3",
    date: "3 days ago",
    content: "Kudos to the municipal team for the prompt action on cleaning the drainage system in Kothrud area before monsoon. Great preventive work!",
    likes: 87,
    comments: 12,
    category: "Sanitation"
  }
];

// Mock data for service ratings
const serviceRatings = [
  {
    id: "service1",
    name: "Water Supply Department",
    rating: 3.5,
    totalRatings: 1245,
    description: "Manages water supply and infrastructure"
  },
  {
    id: "service2",
    name: "Property Tax Department",
    rating: 4.2,
    totalRatings: 876,
    description: "Handles property tax assessment and collection"
  },
  {
    id: "service3",
    name: "Road Construction Department",
    rating: 2.8,
    totalRatings: 1567,
    description: "Responsible for road construction and maintenance"
  },
  {
    id: "service4",
    name: "Waste Management Department",
    rating: 3.7,
    totalRatings: 928,
    description: "Manages waste collection and disposal services"
  }
];

// Mock data for reported issues
const reportedIssues = [
  {
    id: "issue1",
    title: "Garbage dump near Koregaon Park",
    location: "Near Lane 7, Koregaon Park, Pune",
    status: "Under Review",
    date: "Jun 10, 2023",
    category: "Sanitation"
  },
  {
    id: "issue2",
    title: "Pothole on Baner Road",
    location: "Baner Road, near Orchid Hotel",
    status: "Assigned",
    date: "Jun 5, 2023",
    category: "Infrastructure"
  },
  {
    id: "issue3",
    title: "Street light not working",
    location: "FC Road, near Fergusson College",
    status: "Resolved",
    date: "May 28, 2023",
    category: "Electricity"
  }
];

const CommunityEngagement = () => {
  const [activeTab, setActiveTab] = useState("forum");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Post submitted successfully", {
        description: "Your post has been published to the community forum",
      });
    }, 1500);
  };
  
  const handleReportSubmit = () => {
    setReportDialogOpen(false);
    toast.success("Issue reported successfully", {
      description: "Your report has been submitted and will be reviewed",
    });
  };
  
  const handleFeedbackSubmit = () => {
    setFeedbackDialogOpen(false);
    toast.success("Feedback submitted successfully", {
      description: "Thank you for rating the service",
    });
  };
  
  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-5 w-5 fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground" />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Under Review":
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"><Clock className="h-3 w-3" /> {status}</span>;
      case "Assigned":
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800"><User className="h-3 w-3" /> {status}</span>;
      case "Resolved":
        return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"><CheckCircle className="h-3 w-3" /> {status}</span>;
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">{status}</span>;
    }
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Community Engagement</h1>
          <p className="text-muted-foreground">
            Connect with your community, report issues, and provide feedback on government services
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
            <TabsTrigger value="report">Report Issues</TabsTrigger>
            <TabsTrigger value="rate">Rate Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="forum" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Discussion Forum</CardTitle>
                <CardDescription>
                  Share your thoughts, concerns, and ideas with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostSubmit} className="mb-8">
                  <div className="space-y-4">
                    <div>
                      <Textarea 
                        placeholder="What's on your mind? Share your thoughts or concerns..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="water">Water Supply</SelectItem>
                          <SelectItem value="electricity">Electricity</SelectItem>
                          <SelectItem value="sanitation">Sanitation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <Button 
                          type="button" 
                          variant="outline"
                          size="sm"
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          Add Photo
                        </Button>
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Posting..." : "Post"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                
                <div className="space-y-6">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="rounded-lg border p-4 animate-fade-in">
                      <div className="flex items-start gap-3">
                        <img 
                          src={post.avatar} 
                          alt={post.author} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{post.author}</h3>
                              <p className="text-xs text-muted-foreground">{post.date}</p>
                            </div>
                            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {post.category}
                            </span>
                          </div>
                          <p className="mt-2 text-sm">{post.content}</p>
                          <div className="mt-4 flex items-center gap-4">
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button variant="outline">Load More Posts</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="report" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Community Issues</CardTitle>
                <CardDescription>
                  Help improve your community by reporting infrastructure issues, illegal activities, or service problems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid gap-6 md:grid-cols-3">
                  <Card className="cursor-pointer transition-all hover:bg-secondary/50" onClick={() => setReportDialogOpen(true)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        Infrastructure Issues
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Report potholes, damaged roads, bridge issues, or other infrastructure problems
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer transition-all hover:bg-secondary/50" onClick={() => setReportDialogOpen(true)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Trash2 className="h-5 w-5 text-primary" />
                        Sanitation Problems
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Report garbage dumps, sewage issues, or water contamination problems
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer transition-all hover:bg-secondary/50" onClick={() => setReportDialogOpen(true)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                        Illegal Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Report illegal construction, encroachment, or other prohibited activities
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <h3 className="font-medium">Your Reported Issues</h3>
                  </div>
                  <div className="p-4">
                    {reportedIssues.length > 0 ? (
                      <div className="space-y-4">
                        {reportedIssues.map((issue) => (
                          <div key={issue.id} className="rounded-lg border p-4 animate-fade-in">
                            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{issue.title}</h4>
                                  {getStatusBadge(issue.status)}
                                </div>
                                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{issue.location}</span>
                                  <span>•</span>
                                  <span>{issue.date}</span>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                Track Progress
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <FileText className="mb-2 h-10 w-10 text-muted-foreground" />
                        <h3 className="text-lg font-medium">No reported issues yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Help improve your community by reporting issues you notice
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 rounded-lg bg-primary/5 p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-lg font-medium">Community Impact</h3>
                      <p className="mt-2 text-muted-foreground">
                        Your reports make a difference! In the past month, community reports have led to:
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>42 potholes repaired across the city</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>18 illegal dumping sites cleaned</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>35 streetlights fixed in residential areas</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rate" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rate Government Services</CardTitle>
                <CardDescription>
                  Share your experience and help improve government services through your feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Input placeholder="Search services..." />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {serviceRatings.map((service) => (
                    <div key={service.id} className="rounded-lg border p-4 animate-fade-in">
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <StarRating rating={service.rating} />
                            <span className="text-sm text-muted-foreground">
                              ({service.totalRatings.toLocaleString()} ratings)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setFeedbackDialogOpen(true)}
                          >
                            <Star className="mr-2 h-4 w-4" />
                            Rate Service
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            <BarChart className="mr-2 h-4 w-4" />
                            View Ratings
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 rounded-lg bg-primary/5 p-6">
                  <div className="text-center">
                    <Users className="mx-auto mb-4 h-12 w-12 text-primary" />
                    <h3 className="text-xl font-medium">Your Voice Matters</h3>
                    <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                      Citizen feedback has directly led to service improvements across departments. Your ratings and reviews help identify areas that need attention and recognize excellent service.
                    </p>
                  </div>
                  
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <h4 className="text-2xl font-bold">12,356</h4>
                      <p className="text-sm text-muted-foreground">Total citizen ratings submitted</p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <h4 className="text-2xl font-bold">87%</h4>
                      <p className="text-sm text-muted-foreground">Of departments improved based on feedback</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Report Issue Dialog */}
        <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Report an Issue</DialogTitle>
              <DialogDescription>
                Provide details about the issue you want to report
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Issue Type</label>
                <Select defaultValue="infrastructure">
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infrastructure Issue</SelectItem>
                    <SelectItem value="sanitation">Sanitation Problem</SelectItem>
                    <SelectItem value="illegal">Illegal Activity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Issue Title</label>
                <Input placeholder="Provide a short, descriptive title" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Street address or landmark" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe the issue in detail" 
                  className="min-h-[100px]" 
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Upload Photo Evidence (Optional)</label>
                <div className="flex items-center justify-center rounded-lg border border-dashed p-4">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReportSubmit}>
                Submit Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Rate Service Dialog */}
        <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Rate Government Service</DialogTitle>
              <DialogDescription>
                Share your experience to help improve this service
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="font-medium">How would you rate this service?</h3>
                <div className="mt-2 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="p-1">
                      <Star className="h-8 w-8 text-muted-foreground hover:text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Your Experience</label>
                <Textarea 
                  placeholder="Tell us about your experience with this service" 
                  className="min-h-[100px]" 
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Suggestions for Improvement (Optional)</label>
                <Textarea 
                  placeholder="How can this service be improved?" 
                  className="min-h-[80px]" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleFeedbackSubmit}>
                Submit Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CommunityEngagement;
