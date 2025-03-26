
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, User } from "lucide-react";

export interface ChatMessageProps {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatMessage = ({ content, sender, timestamp }: ChatMessageProps) => {
  const isUser = sender === "user";
  
  return (
    <div className={cn(
      "flex w-full max-w-[80%] animate-fade-in",
      isUser ? "ml-auto" : "mr-auto"
    )}>
      {!isUser && (
        <Avatar className="mr-2 h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <MessageSquare className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "rounded-2xl px-4 py-3",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-secondary-foreground"
      )}>
        <div className="text-sm">{content}</div>
        <div className="mt-1 text-right text-xs opacity-70">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="ml-2 h-8 w-8 shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
