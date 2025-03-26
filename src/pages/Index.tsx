
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  FileText, 
  Bell, 
  ShieldCheck, 
  BarChart3, 
  MapPin, 
  AlertTriangle,
  Users
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import FeatureCard from "@/components/FeatureCard";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-20">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5">
              <span className="text-sm font-medium text-primary">AI-Powered Governance</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Pulse of Maharashtra
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Empowering citizens and enhancing governance through AI-driven solutions for a more connected, transparent, and efficient Maharashtra.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="animate-fade-in">
                <Link to="/services">Explore Services</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="animate-fade-in delay-100">
                <Link to="/chatbot">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Talk to AI Assistant
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 -z-10 h-64 w-64 translate-x-1/2 rounded-full bg-primary/10 blur-3xl"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              AI-Powered Governance Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              Leveraging artificial intelligence to transform citizen services and government operations.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="AI Chatbot"
              description="Multilingual virtual assistant for instant guidance on government services in Marathi, Hindi, and English."
              link="/services/chatbot"
              className="delay-100"
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="Smart Grievance Redressal"
              description="AI-powered system that categorizes, prioritizes, and tracks citizen complaints for faster resolution."
              link="/services/grievances"
              className="delay-200"
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Document Verification"
              description="Secure digital verification of land records, certificates and important documents using AI."
              link="/services/documents"
              className="delay-300"
            />
            <FeatureCard
              icon={<AlertTriangle className="h-6 w-6" />}
              title="Fraud Detection"
              description="AI-based detection and reporting of subsidy fraud in MahaDBT schemes for greater transparency."
              link="/services/fraud"
              className="delay-400"
            />
            <FeatureCard
              icon={<MapPin className="h-6 w-6" />}
              title="Disaster Response"
              description="Predictive analytics for emergencies with real-time alerts and interactive mapping."
              link="/services/disaster"
              className="delay-500"
            />
            <FeatureCard
              icon={<Bell className="h-6 w-6" />}
              title="Personalized Alerts"
              description="Customized notifications about subsidies, policy changes and local governance updates."
              link="/services/alerts"
              className="delay-500"
            />
          </div>
        </div>
      </section>
      
      {/* Chatbot Demo Section */}
      <section className="bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Experience Our AI Assistant
            </h2>
            <p className="text-lg text-muted-foreground">
              Get instant help with government services, schemes, and information through our intelligent chatbot.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border bg-card shadow-xl">
              <div className="h-[500px]">
                <Chatbot />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Making Real Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform is transforming governance and improving the lives of citizens across Maharashtra.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm animate-fade-in delay-100">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">500,000+</h3>
              <p className="text-muted-foreground">Citizens actively using our platform</p>
            </div>
            
            <div className="rounded-lg border bg-card p-6 shadow-sm animate-fade-in delay-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">85%</h3>
              <p className="text-muted-foreground">Faster resolution of citizen grievances</p>
            </div>
            
            <div className="rounded-lg border bg-card p-6 shadow-sm animate-fade-in delay-300">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">₹120 Crore</h3>
              <p className="text-muted-foreground">Saved through fraud detection and prevention</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your experience with government services?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Start using Pulse of Maharashtra today and experience faster, more transparent governance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/services">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
