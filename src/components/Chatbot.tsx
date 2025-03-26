
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send } from "lucide-react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

const initialMessages: Omit<ChatMessageProps, "id">[] = [
  {
    content: "Hello! I'm your AI assistant for Maharashtra government services. How can I help you today?",
    sender: "ai",
    timestamp: new Date(),
  },
];

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    initialMessages.map((msg) => ({ ...msg, id: crypto.randomUUID() }))
  );
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessageProps = {
      id: crypto.randomUUID(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessageProps = {
        id: crypto.randomUUID(),
        content: getAIResponse(input),
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };
  
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate speech-to-text
      setTimeout(() => {
        setInput("Show me the status of my ration card application");
        setIsRecording(false);
      }, 2000);
    }
  };
  
  const getAIResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes("ration card")) {
      return "Your ration card application (ID: RC20230915) is currently under verification. The expected completion date is within 5 working days. Would you like to receive a notification when it's completed?";
    } else if (userInputLower.includes("subsidy") || userInputLower.includes("scheme")) {
      return "You are eligible for 3 government subsidy schemes: PM Kisan Yojana, MahaDBT Education Scholarship, and Solar Rooftop Subsidy. Would you like details about any specific scheme?";
    } else if (userInputLower.includes("grievance") || userInputLower.includes("complaint")) {
      return "You can file a new grievance through our Smart Grievance system. Would you like me to guide you through the process, or check the status of an existing grievance?";
    } else if (userInputLower.includes("document") || userInputLower.includes("verification")) {
      return "Our document verification service can help authenticate land records, certificates, and other government documents. Would you like to verify a document or check the status of a previously submitted document?";
    } else {
      return "I understand you're looking for assistance with Maharashtra government services. Could you please specify what information or service you need help with?";
    }
  };
  
  return (
    <div className="flex h-full flex-col rounded-lg border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-lg font-semibold">AI Assistant</h3>
        <div className="text-sm text-muted-foreground">Available in Marathi, Hindi & English</div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            id={message.id}
            content={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            onClick={handleToggleRecording}
            className="shrink-0"
          >
            {isRecording ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} className="shrink-0">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
