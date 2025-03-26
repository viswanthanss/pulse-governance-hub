
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ShieldCheck,
  Lock,
  Key,
  Fingerprint,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  User,
  Check,
  ChevronRight,
  Share2,
  Copy
} from "lucide-react";
import { toast } from "sonner";

const SecureIdentity = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("password");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login successful", {
      description: "You have been securely logged in",
    });
    
    // In a real app, this would authenticate the user
    setAuthDialogOpen(false);
  };
  
  const handleShare = () => {
    toast.success("Share link created", {
      description: "Secure document share link has been created and copied to clipboard",
    });
  };
  
  const handleCopy = () => {
    toast.success("Copied to clipboard", {
      description: "Document ID has been copied to clipboard",
    });
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Secure Digital Identity</h1>
          <p className="text-muted-foreground">
            Encrypted login for seamless authentication and secure document storage
          </p>
        </div>
        
        <Tabs defaultValue="authentication" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="documents">Secure Documents</TabsTrigger>
            <TabsTrigger value="account">Account Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="authentication" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>
                  Multiple secure ways to access your government services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="rounded-lg border p-6">
                    <h3 className="mb-6 text-lg font-medium">Login Options</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Card className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => setLoginMethod("password")}>
                        <CardContent className="flex flex-col items-center gap-2 p-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Lock className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="text-center font-medium">Password</h4>
                          <p className="text-center text-xs text-muted-foreground">
                            Login with your secure password
                          </p>
                          {loginMethod === "password" && (
                            <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => setLoginMethod("otp")}>
                        <CardContent className="flex flex-col items-center gap-2 p-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Key className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="text-center font-medium">OTP</h4>
                          <p className="text-center text-xs text-muted-foreground">
                            Login with one-time password
                          </p>
                          {loginMethod === "otp" && (
                            <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => setLoginMethod("biometric")}>
                        <CardContent className="flex flex-col items-center gap-2 p-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Fingerprint className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="text-center font-medium">Biometric</h4>
                          <p className="text-center text-xs text-muted-foreground">
                            Login with fingerprint or face ID
                          </p>
                          {loginMethod === "biometric" && (
                            <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-6 grid place-items-center">
                      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full max-w-md">
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Secure Login
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Secure Authentication</DialogTitle>
                            <DialogDescription>
                              {loginMethod === "password" 
                                ? "Enter your credentials to login securely" 
                                : loginMethod === "otp" 
                                  ? "We'll send a one-time code to your registered mobile number" 
                                  : "Use your device's biometric authentication"}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {loginMethod === "password" && (
                            <form onSubmit={handleLogin} className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">User ID / Aadhaar Number</label>
                                <Input placeholder="Enter your ID" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Password</label>
                                <div className="relative">
                                  <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter your password" 
                                  />
                                  <button 
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              <DialogFooter className="mt-4">
                                <Button type="submit" className="w-full">Login Securely</Button>
                              </DialogFooter>
                            </form>
                          )}
                          
                          {loginMethod === "otp" && (
                            <form onSubmit={handleLogin} className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Mobile Number</label>
                                <div className="flex gap-3">
                                  <Input placeholder="Enter registered mobile number" />
                                  <Button type="button" variant="outline">
                                    Send OTP
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Enter OTP</label>
                                <Input placeholder="Enter 6-digit OTP" maxLength={6} />
                              </div>
                              <DialogFooter className="mt-4">
                                <Button type="submit" className="w-full">Verify & Login</Button>
                              </DialogFooter>
                            </form>
                          )}
                          
                          {loginMethod === "biometric" && (
                            <div className="space-y-4 py-4">
                              <div className="grid place-items-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                                  <Fingerprint className="h-14 w-14 text-primary" />
                                </div>
                                <p className="mt-4 text-center text-sm">
                                  Place your finger on the sensor or use Face ID to authenticate
                                </p>
                              </div>
                              <DialogFooter className="mt-4">
                                <Button className="w-full" onClick={handleLogin}>
                                  Authenticate
                                </Button>
                              </DialogFooter>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border bg-muted/40 p-6">
                      <ShieldCheck className="mb-4 h-8 w-8 text-primary" />
                      <h3 className="mb-2 text-lg font-medium">Blockchain Verification</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Your identity and documents are secured using blockchain technology, ensuring tamper-proof verification and authentication.
                      </p>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Immutable record of all verification activities</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Cryptographically secured identity information</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Decentralized storage prevents single point of failure</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border bg-muted/40 p-6">
                      <Lock className="mb-4 h-8 w-8 text-primary" />
                      <h3 className="mb-2 text-lg font-medium">End-to-End Encryption</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        All your data and communications are protected with military-grade encryption, ensuring your information remains private and secure.
                      </p>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>AES-256 encryption for all stored documents</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Secure transmission with TLS 1.3 protocol</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Zero-knowledge architecture for maximum privacy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Blockchain-Secured Documents</CardTitle>
                <CardDescription>
                  Store and verify important documents with tamper-proof technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-medium">Your Secure Documents</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Aadhaar Card</h4>
                          <p className="text-xs text-muted-foreground">
                            ID: XXXX-XXXX-7896 • Verified on blockchain
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShare}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">PAN Card</h4>
                          <p className="text-xs text-muted-foreground">
                            ID: ABCDE1234F • Verified on blockchain
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShare}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Driving License</h4>
                          <p className="text-xs text-muted-foreground">
                            ID: MH01-2021-0012345 • Verified on blockchain
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShare}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Voter ID Card</h4>
                          <p className="text-xs text-muted-foreground">
                            ID: ABC1234567 • Verified on blockchain
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShare}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-medium">Document Sharing</h3>
                  
                  {!showQRCode ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <h4 className="mb-3 font-medium">Time-limited Access</h4>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Share your documents securely with time-limited access that automatically expires
                        </p>
                        <Button variant="outline" className="w-full" onClick={() => setShowQRCode(true)}>
                          Generate Secure Link
                        </Button>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <h4 className="mb-3 font-medium">Consent-Based Sharing</h4>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Control exactly what information is shared with specific permissions
                        </p>
                        <Button variant="outline" className="w-full" onClick={() => setShowQRCode(true)}>
                          Share with Consent Control
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4 h-48 w-48 rounded-lg bg-muted flex items-center justify-center">
                        <QRCode />
                      </div>
                      <h4 className="font-medium">Secure Document Share</h4>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Scan this QR code or use the secure link below
                      </p>
                      <div className="mb-4 flex w-full max-w-md items-center gap-2 rounded-md border bg-muted/50 p-2">
                        <code className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
                          https://secure.maharashtra.gov.in/share/doc-94829384982
                        </code>
                        <Button variant="ghost" size="sm" onClick={handleCopy}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={() => setShowQRCode(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleShare}>
                          Share Link
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 rounded-lg border bg-secondary/30 p-6">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="mt-1 h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-medium">Blockchain Verification Technology</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        All your documents are secured on a private blockchain, creating a tamper-proof digital record. Each document has a unique cryptographic hash, allowing instant verification while maintaining your privacy. This ensures your documents remain authentic and can be safely shared with authorized parties.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your security settings and authentication methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border p-6">
                    <h3 className="mb-4 text-lg font-medium">Two-Factor Authentication</h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                      Add an extra layer of security to your account by enabling two-factor authentication
                    </p>
                    <div className="grid gap-6 md:grid-cols-3">
                      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                        <CardContent className="flex flex-col items-center gap-2 p-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Smartphone className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="text-center font-medium">SMS</h4>
                          <p className="text-center text-xs text-muted-foreground">
                            Receive verification codes via SMS
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">Enable</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                        <CardContent className="flex flex-col items-center gap-2 p-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Smartphone className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="text-center font-medium">Authentication App</h4>
                          <p className="text-center text-xs text-muted-foreground">
                            Use an authenticator app
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">Set Up</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                        <CardContent className="flex flex-col items-center gap-2 p-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="text-center font-medium">Email</h4>
                          <p className="text-center text-xs text-muted-foreground">
                            Receive codes via email
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">Enable</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-6">
                    <h3 className="mb-4 text-lg font-medium">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Biometric Authentication</h4>
                          <p className="text-sm text-muted-foreground">
                            Use fingerprint or face recognition for login
                          </p>
                        </div>
                        <Button variant="outline">Set Up</Button>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Change Password</h4>
                          <p className="text-sm text-muted-foreground">
                            Update your account password
                          </p>
                        </div>
                        <Button variant="outline">Update</Button>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Login Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Get alerts when your account is accessed
                          </p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Recent Login Activity</h4>
                          <p className="text-sm text-muted-foreground">
                            View your recent account access
                          </p>
                        </div>
                        <Button variant="outline">View</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-6">
                    <h3 className="mb-4 text-lg font-medium">Recovery Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Recovery Email</h4>
                            <p className="text-sm text-muted-foreground">
                              a****@gmail.com
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Recovery Phone</h4>
                            <p className="text-sm text-muted-foreground">
                              +91 ******7890
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Key className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Recovery Keys</h4>
                            <p className="text-sm text-muted-foreground">
                              Set up recovery keys for account access
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Generate</Button>
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

// Simple QR code component
const QRCode = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="h-40 w-40 bg-white p-2">
        <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-1">
          {/* QR code pattern */}
          <div className="col-span-1 row-span-1 bg-black"></div>
          <div className="col-span-3 row-span-1"></div>
          <div className="col-span-1 row-span-1 bg-black"></div>
          
          <div className="col-span-1 row-span-3"></div>
          <div className="col-span-3 row-span-3 grid grid-cols-3 grid-rows-3 gap-1">
            <div className="bg-black"></div>
            <div></div>
            <div className="bg-black"></div>
            <div></div>
            <div className="bg-black"></div>
            <div></div>
            <div className="bg-black"></div>
            <div></div>
            <div className="bg-black"></div>
          </div>
          <div className="col-span-1 row-span-3"></div>
          
          <div className="col-span-1 row-span-1 bg-black"></div>
          <div className="col-span-3 row-span-1"></div>
          <div className="col-span-1 row-span-1 bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default SecureIdentity;
