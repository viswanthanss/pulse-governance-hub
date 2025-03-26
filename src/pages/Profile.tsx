
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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  LogOut, 
  Edit,
  Lock,
  Smartphone,
  Languages,
  Upload
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [profileForm, setProfileForm] = useState({
    fullName: "Ajay Patel",
    email: "ajay.patel@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Andheri, Mumbai, Maharashtra",
    district: "Mumbai",
    pincode: "400053"
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appNotifications: true,
    language: "english"
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (name: string, checked: boolean) => {
    setPreferences(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };
  
  const handlePreferencesUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Preferences updated successfully");
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl">AP</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Edit className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                  <h3 className="mt-4 text-xl font-bold">Ajay Patel</h3>
                  <p className="text-sm text-muted-foreground">Citizen ID: MH20230001</p>
                </div>
                
                <div className="mt-6 space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#profile">
                      <User className="mr-2 h-5 w-5" />
                      Personal Information
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#preferences">
                      <Settings className="mr-2 h-5 w-5" />
                      Preferences
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#security">
                      <Shield className="mr-2 h-5 w-5" />
                      Security
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive">
                    <LogOut className="mr-2 h-5 w-5" />
                    Log out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <Card id="profile" className="scroll-mt-20 animate-fade-in">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <label htmlFor="fullName" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={profileForm.fullName}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="grid gap-3">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="grid gap-3">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      <label htmlFor="address" className="text-sm font-medium">
                        Address
                      </label>
                      <Textarea
                        id="address"
                        name="address"
                        value={profileForm.address}
                        onChange={handleProfileChange}
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="grid gap-3">
                        <label htmlFor="district" className="text-sm font-medium">
                          District
                        </label>
                        <Select
                          value={profileForm.district}
                          onValueChange={(value) => setProfileForm(prev => ({ ...prev, district: value }))}
                        >
                          <SelectTrigger id="district">
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mumbai">Mumbai</SelectItem>
                            <SelectItem value="Pune">Pune</SelectItem>
                            <SelectItem value="Nagpur">Nagpur</SelectItem>
                            <SelectItem value="Nashik">Nashik</SelectItem>
                            <SelectItem value="Aurangabad">Aurangabad</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <label htmlFor="pincode" className="text-sm font-medium">
                          PIN Code
                        </label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={profileForm.pincode}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Update Profile</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card id="preferences" className="scroll-mt-20 animate-fade-in delay-100">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your app experience and notification settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePreferencesUpdate}>
                  <div className="space-y-6">
                    <div className="grid gap-3">
                      <h3 className="text-sm font-medium">Notification Settings</h3>
                      <div className="rounded-lg border p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <label htmlFor="emailNotifications" className="text-sm">
                              Email Notifications
                            </label>
                          </div>
                          <Switch
                            id="emailNotifications"
                            checked={preferences.emailNotifications}
                            onCheckedChange={(checked) => handleToggleChange('emailNotifications', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-5 w-5 text-muted-foreground" />
                            <label htmlFor="smsNotifications" className="text-sm">
                              SMS Notifications
                            </label>
                          </div>
                          <Switch
                            id="smsNotifications"
                            checked={preferences.smsNotifications}
                            onCheckedChange={(checked) => handleToggleChange('smsNotifications', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <label htmlFor="appNotifications" className="text-sm">
                              App Notifications
                            </label>
                          </div>
                          <Switch
                            id="appNotifications"
                            checked={preferences.appNotifications}
                            onCheckedChange={(checked) => handleToggleChange('appNotifications', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      <h3 className="text-sm font-medium">Language Settings</h3>
                      <div className="rounded-lg border p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Languages className="h-5 w-5 text-muted-foreground" />
                            <label htmlFor="language" className="text-sm">
                              Preferred Language
                            </label>
                          </div>
                          <Select
                            value={preferences.language}
                            onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
                          >
                            <SelectTrigger id="language" className="w-[180px]">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="hindi">Hindi</SelectItem>
                              <SelectItem value="marathi">Marathi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Save Preferences</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card id="security" className="scroll-mt-20 animate-fade-in delay-200">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your account security and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-3">
                    <h3 className="text-sm font-medium">Password Management</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 mb-4 sm:mb-0">
                          <Lock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Change Password</p>
                            <p className="text-xs text-muted-foreground">
                              Last updated 3 months ago
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Update Password</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 mb-4 sm:mb-0">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Enable Two-Factor Authentication</p>
                            <p className="text-xs text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                        </div>
                        <Button>Enable 2FA</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    <h3 className="text-sm font-medium">Document Verification</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 mb-4 sm:mb-0">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Verify Your Identity</p>
                            <p className="text-xs text-muted-foreground">
                              Upload your identification documents for verification
                            </p>
                          </div>
                        </div>
                        <Tabs defaultValue="verified" className="w-[200px]">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="verified">Verified</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start border-t px-6 py-4">
                <h4 className="font-medium">Account Protection</h4>
                <p className="text-sm text-muted-foreground">
                  Your account is protected with end-to-end encryption and biometric authentication features. Regular security audits ensure your data remains safe.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
