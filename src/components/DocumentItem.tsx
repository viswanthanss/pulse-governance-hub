
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DocumentItemProps {
  id: string;
  title: string;
  type: string;
  issuedDate: string;
  verificationStatus: "verified" | "pending" | "rejected";
  previewUrl?: string;
  className?: string;
}

const DocumentItem = ({
  id,
  title,
  type,
  issuedDate,
  verificationStatus,
  previewUrl,
  className
}: DocumentItemProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  
  return (
    <>
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
          <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-6">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt={title}
                className="max-h-[60vh] rounded-md object-contain"
              />
            ) : (
              <div className="flex h-48 w-full items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">Preview not available</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentItem;
