import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, LockKeyhole, Fingerprint, Shield, UserCog, Key, Scan, FileText, AlertTriangle, Smartphone, UserCheck, Database, CheckCheck, Clock } from "lucide-react";

// Mock activity data
const activityData = [
  {
    id: "act1",
    action: "Login",
    device: "Mobile App - iPhone 13",
    location: "Pune, Maharashtra",
    time: "Today, 10:32 AM"
  },
  {
    id: "act2",
    action: "Document Access",
    device: "Web Browser - Chrome",
    location: "Mumbai, Maharashtra",
    time: "Yesterday, 4:15 PM"
  },
  {
    id: "act3",
    action: "Profile Update",
    device: "Mobile App - iPhone 13",
    location: "Pune, Maharashtra",
    time: "Jun 10, 2023, 2:45 PM"
  },
  {
    id: "act4",
    action: "Document Upload",
    device: "Web Browser - Chrome",
    location: "Mumbai, Maharashtra",
    time: "Jun 8, 2023, 11:20 AM"
  }
];

// Mock documents data
const documentsData = [
  {
    id: "doc1",
    name: "Aadhar Card",
    status: "Verified",
    lastAccessed: "Jun 10, 2023"
  },
  {
    id: "doc2",
    name: "PAN Card",
    status: "Verified",
    lastAccessed: "May 25, 2023"
  },
  {
    id: "doc3",
    name: "Voter ID",
    status: "Pending Verification",
    lastAccessed: "Jun 5, 2023"
  },
  {
    id: "doc4",
    name: "Driving License",
    status: "Verified",
    lastAccessed: "Apr 18, 2023"
  }
];

const SecureIdentity = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [mfaDialogOpen, setMfaDialogOpen] = useState(false);
  const [biometricDialogOpen, setBiometricDialogOpen] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [bioAuthEnabled, setBioAuthEnabled] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  
  const handleMfaToggle = () => {
    setMfaDialogOpen(true);
  };
  
  const handleBiometricToggle = () => {
    setBiometricDialogOpen(true);
  };
  
  const confirmMfaToggle = () => {
    setMfaEnabled(!mfaEnabled);
    setMfaDialogOpen(false);
    toast.success(
      mfaEnabled 
        ? "Two-factor authentication disabled" 
        : "Two-factor authentication enabled",
      {
        description: mfaEnabled 
          ? "Your account is now protected with single-factor authentication only" 
          : "Your account is now protected with an additional layer of security"
      }
    );
  };
  
  const confirmBiometricToggle = () => {
    setBioAuthEnabled(!bioAuthEnabled);
    setBiometricDialogOpen(false);
    toast.success(
      bioAuthEnabled 
        ? "Biometric authentication disabled" 
        : "Biometric authentication enabled",
      {
        description: bioAuthEnabled 
          ? "You will now authenticate using password and OTP only" 
          : "You can now use your fingerprint or face to authenticate"
      }
    );
  };
  
  const handlePasswordChange = () => {
    toast.success("Password updated successfully", {
      description: "Your password has been changed and a confirmation email has been sent"
    });
    setPasswordDialogOpen(false);
  };
  
  const handleLogoutEverywhere = () => {
    setAuthDialogOpen(false);
    toast.success("Logged out from all devices", {
      description: "You have been securely logged out from all other devices"
    });
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Secure Digital Identity</h1>
          <p className="text-muted-foreground">
            Manage your secure digital identity and authentication preferences
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value="Rahul Sharma" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value="rahul.sharma@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value="123 Main Street, Pune, Maharashtra" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => toast.success("Profile updated successfully")}>
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Digital Identity Verification</CardTitle>
                  <CardDescription>
                    Your verified digital identity enables secure access to government services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Identity Verified</h3>
                        <p className="text-sm text-muted-foreground">
                          Your identity has been verified through Aadhaar authentication
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Linked Accounts</h3>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Fingerprint className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Aadhaar</p>
                          <p className="text-xs text-muted-foreground">
                            Linked on May 10, 2023
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">PAN</p>
                          <p className="text-xs text-muted-foreground">
                            Linked on June 2, 2023
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">
                    Link Additional Documents
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and authentication methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <LockKeyhole className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Password</p>
                        <p className="text-sm text-muted-foreground">
                          Last changed 30 days ago
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPasswordDialogOpen(true)}
                    >
                      Change
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          {mfaEnabled ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={mfaEnabled ? "destructive" : "outline"} 
                      size="sm"
                      onClick={handleMfaToggle}
                    >
                      {mfaEnabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Fingerprint className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Biometric Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          {bioAuthEnabled ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={bioAuthEnabled ? "destructive" : "outline"} 
                      size="sm"
                      onClick={handleBiometricToggle}
                    >
                      {bioAuthEnabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security Features</CardTitle>
                  <CardDescription>
                    Advanced security features to protect your digital identity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Account Security Status</h4>
                        <p className="text-sm text-amber-700">
                          Your account security is good, but could be improved by enabling biometric authentication.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 bg-amber-100 border-amber-200 text-amber-800 hover:bg-amber-200"
                          onClick={handleBiometricToggle}
                        >
                          Improve Security
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Blockchain Document Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Your documents are secured using blockchain technology for tamper-proof verification.
                    </p>
                    
                    <div className="space-y-3">
                      {documentsData.slice(0, 2).map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Secured on blockchain
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Database className="h-4 w-4 mr-2" />
                            Verify
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View All Protected Documents
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Active Sessions</h3>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => setAuthDialogOpen(true)}
                    >
                      <Key className="mr-2 h-4 w-4" />
                      Logout from All Devices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Activity</CardTitle>
                <CardDescription>
                  View your recent account activity and document access history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="login">Login Activity</TabsTrigger>
                    <TabsTrigger value="docs">Document Access</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="mt-4 space-y-4">
                    <div className="relative overflow-x-auto rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Action</TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activityData.map((activity) => (
                            <TableRow key={activity.id}>
                              <TableCell className="font-medium">{activity.action}</TableCell>
                              <TableCell>{activity.device}</TableCell>
                              <TableCell>{activity.location}</TableCell>
                              <TableCell>{activity.time}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="rounded-lg bg-primary/5 p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">No Suspicious Activity Detected</h4>
                          <p className="text-sm text-muted-foreground">
                            Our AI-powered security system has not detected any suspicious login attempts or unusual activity patterns.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="docs" className="mt-4 space-y-4">
                    <div className="relative overflow-x-auto rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Document</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Accessed</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {documentsData.map((doc) => (
                            <TableRow key={doc.id}>
                              <TableCell className="font-medium">{doc.name}</TableCell>
                              <TableCell>
                                {doc.status === "Verified" ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                    <CheckCheck className="h-3 w-3" /> Verified
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                    <Clock className="h-3 w-3" /> Pending
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>{doc.lastAccessed}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  View Access Log
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="rounded-lg bg-primary/5 p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Document Access Control</h4>
                          <p className="text-sm text-muted-foreground">
                            Every access to your documents is recorded with timestamp, location, and device information for your security.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 rounded-lg border p-6">
                  <div className="text-center">
                    <Shield className="mx-auto mb-4 h-16 w-16 text-primary/60" />
                    <h3 className="mb-2 text-xl font-medium">Blockchain-Based Verification</h3>
                    <p className="mx-auto max-w-md text-muted-foreground">
                      Your documents and identity are protected by advanced blockchain technology, ensuring tamper-proof verification and complete audit trails.
                    </p>
                  </div>
                  
                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Database className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 font-medium">Immutable Records</h4>
                      <p className="text-sm text-muted-foreground">
                        All verification transactions are permanently recorded on blockchain
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Scan className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 font-medium">Instant Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        Government departments can instantly verify your documents
                      </p>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserCheck className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 font-medium">User Control</h4>
                      <p className="text-sm text-muted-foreground">
                        You control who can access your documents and for how long
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Authentication Related Dialogs */}
        <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Create a new secure password for your account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePasswordChange}>
                Update Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={mfaDialogOpen} onOpenChange={setMfaDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {mfaEnabled ? "Disable Two-Factor Authentication?" : "Enable Two-Factor Authentication?"}
              </DialogTitle>
              <DialogDescription>
                {mfaEnabled 
                  ? "This will reduce the security of your account. Are you sure you want to continue?" 
                  : "Add an additional layer of security to your account"}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {mfaEnabled ? (
                <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h4 className="font-medium text-destructive">Security Warning</h4>
                    <p className="text-sm text-destructive/80">
                      Disabling two-factor authentication will make your account more vulnerable to unauthorized access.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 rounded-lg bg-primary/10 p-4">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Enhanced Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Two-factor authentication requires both your password and a verification code from your mobile device to log in.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMfaDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant={mfaEnabled ? "destructive" : "default"}
                onClick={confirmMfaToggle}
              >
                {mfaEnabled ? "Disable" : "Enable"} Two-Factor Authentication
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={biometricDialogOpen} onOpenChange={setBiometricDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {bioAuthEnabled ? "Disable Biometric Authentication?" : "Enable Biometric Authentication?"}
              </DialogTitle>
              <DialogDescription>
                {bioAuthEnabled 
                  ? "This will remove fingerprint and face authentication options" 
                  : "Use your fingerprint or face for faster, more secure login"}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {!bioAuthEnabled && (
                <div className="flex flex-col items-center gap-4 p-4">
                  <Fingerprint className="h-16 w-16 text-primary" />
                  <p className="text-center text-sm text-muted-foreground">
                    Biometric authentication allows you to log in using your fingerprint or face, providing a faster and more secure authentication method.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBiometricDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant={bioAuthEnabled ? "destructive" : "default"}
                onClick={confirmBiometricToggle}
              >
                {bioAuthEnabled ? "Disable" : "Enable"} Biometric Authentication
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Out From All Devices?</DialogTitle>
              <DialogDescription>
                This will terminate all active sessions except the current one
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-4 border border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">All devices will be logged out</h4>
                  <p className="text-sm text-amber-700">
                    You will need to log in again on all other devices. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAuthDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleLogoutEverywhere}
              >
                Log Out From All Devices
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default SecureIdentity;

