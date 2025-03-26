
import { 
  MessageSquare, 
  FileText, 
  Bell, 
  ShieldCheck, 
  BarChart3, 
  MapPin, 
  AlertTriangle,
  Users,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <Layout>
      <section className="bg-gradient-to-b from-background to-secondary/30 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Government Services
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Explore our comprehensive range of AI-powered services designed to enhance governance and citizen experience.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md animate-fade-in">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10"></div>
              <div className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">AI Chatbot</h3>
                <p className="mb-6 text-muted-foreground">
                  Get instant assistance with government services through our AI-powered virtual assistant that supports Marathi, Hindi, and English languages. Ask about schemes, application statuses, and procedures.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/services/chatbot">
                      Start Conversation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md animate-fade-in delay-100">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10"></div>
              <div className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Smart Grievance Redressal</h3>
                <p className="mb-6 text-muted-foreground">
                  Submit and track complaints with our AI-powered grievance system that automatically categorizes, prioritizes, and provides estimated resolution times for faster processing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/grievances">
                      File Grievance <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/grievances/track">Track Status</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md animate-fade-in delay-200">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10"></div>
              <div className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Document Verification</h3>
                <p className="mb-6 text-muted-foreground">
                  Verify government documents securely using AI-powered authentication. Store and manage your critical documents in an encrypted digital wallet for easy access.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/documents">
                      Verify Documents <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/documents/wallet">Digital Wallet</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md animate-fade-in delay-300">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10"></div>
              <div className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Fraud Detection</h3>
                <p className="mb-6 text-muted-foreground">
                  Report suspected fraud in government subsidy schemes with our AI-based detection system. Upload evidence and track investigation status securely.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/services/fraud">
                      Report Fraud <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md animate-fade-in delay-400">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10"></div>
              <div className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Disaster Response</h3>
                <p className="mb-6 text-muted-foreground">
                  Stay informed with AI-powered predictive analytics for natural disasters, water management, and emergency situations with real-time alerts and interactive maps.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/services/disaster">
                      View Alerts <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md animate-fade-in delay-500">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10"></div>
              <div className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                  <Bell className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Personalized Alerts</h3>
                <p className="mb-6 text-muted-foreground">
                  Receive customized notifications about subsidies, policy changes, and local governance updates based on your profile and location data.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/services/alerts">
                      Manage Alerts <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Need assistance with any service?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Our AI assistant can guide you through any government service or procedure.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/services/chatbot">Talk to AI Assistant</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
