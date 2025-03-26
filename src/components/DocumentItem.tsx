
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download, Shield } from "lucide-react";

interface DocumentItemProps {
  id: string;
  title: string;
  type: string;
  issuedDate: string;
  verificationStatus: "verified" | "pending" | "rejected";
  previewUrl?: string;
  className?: string;
  onPreview?: () => void;
  onDownload?: () => void;
}

const DocumentItem = ({
  id,
  title,
  type,
  issuedDate,
  verificationStatus,
  previewUrl,
  className,
  onPreview,
  onDownload
}: DocumentItemProps) => {
  return (
    <div 
      className={cn(
        "group flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-secondary/40",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">{type}</p>
            <p className="text-sm text-muted-foreground">Issued: {issuedDate}</p>
            <div className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" />
              <p 
                className={cn(
                  "text-sm",
                  verificationStatus === "verified" && "text-green-500",
                  verificationStatus === "pending" && "text-amber-500",
                  verificationStatus === "rejected" && "text-red-500"
                )}
              >
                {verificationStatus.charAt(0).toUpperCase() + verificationStatus.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <Button variant="outline" size="sm" onClick={onPreview}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
        <Button variant="outline" size="sm" onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default DocumentItem;
