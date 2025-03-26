
import Layout from "@/components/layout/Layout";
import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import { 
  Languages,
  MessageSquare,
  Volume2,
  VolumeX,
  Mic,
  File
} from "lucide-react";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ChatbotPage = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get instant help with government services and information
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-[70vh]">
              <Chatbot />
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Chatbot Settings</CardTitle>
                <CardDescription>Customize your AI assistant experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-muted-foreground" />
                    <span>Language</span>
                  </div>
                  <Tabs defaultValue="english" className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="english">EN</TabsTrigger>
                      <TabsTrigger value="hindi">HI</TabsTrigger>
                      <TabsTrigger value="marathi">MR</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {audioEnabled ? (
                      <Volume2 className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span>Voice Responses</span>
                  </div>
                  <Button
                    variant={audioEnabled ? "default" : "outline"}
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="h-5 w-5 text-muted-foreground" />
                    <span>Voice Input</span>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <span>Export Conversation</span>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in delay-100">
              <CardHeader>
                <CardTitle>Suggested Questions</CardTitle>
                <CardDescription>Try asking these questions to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left">
                  How do I apply for a ration card?
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  What subsidies am I eligible for?
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  Status of my property tax payment
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  How to report water supply issues?
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  Process for getting birth certificate
                </Button>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in delay-200">
              <CardHeader>
                <CardTitle>AI Capabilities</CardTitle>
                <CardDescription>What our AI assistant can help you with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Multilingual Support</p>
                    <p className="text-sm text-muted-foreground">
                      Communicate in Marathi, Hindi, or English
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Service Information</p>
                    <p className="text-sm text-muted-foreground">
                      Get details about government services and schemes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Application Status</p>
                    <p className="text-sm text-muted-foreground">
                      Check status of your applications and subsidies
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Process Guidance</p>
                    <p className="text-sm text-muted-foreground">
                      Step-by-step guidance for government procedures
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotPage;
