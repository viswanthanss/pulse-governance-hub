
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import Grievances from "./pages/Grievances";
import Documents from "./pages/Documents";
import ChatbotPage from "./pages/ChatbotPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import FraudDetection from "./pages/FraudDetection";
import DisasterResponse from "./pages/DisasterResponse";
import DataVisualization from "./pages/DataVisualization";
import CommunityEngagement from "./pages/CommunityEngagement";
import PersonalizedAlerts from "./pages/PersonalizedAlerts";
import SecureIdentity from "./pages/SecureIdentity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/grievances" element={<Grievances />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/services/chatbot" element={<ChatbotPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services/fraud" element={<FraudDetection />} />
          <Route path="/services/disaster" element={<DisasterResponse />} />
          <Route path="/services/data" element={<DataVisualization />} />
          <Route path="/services/community" element={<CommunityEngagement />} />
          <Route path="/services/alerts" element={<PersonalizedAlerts />} />
          <Route path="/services/identity" element={<SecureIdentity />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
