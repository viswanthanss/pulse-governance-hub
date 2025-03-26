
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  className?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  link,
  className
}: FeatureCardProps) => {
  return (
    <div className={cn("feature-card animate-fade-in", className)}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <Button asChild>
        <Link to={link}>Learn More</Link>
      </Button>
    </div>
  );
};

export default FeatureCard;
