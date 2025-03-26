
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

type StatusType = 'success' | 'warning' | 'error' | 'pending' | 'processing' | 'completed';

interface StatusBadgeProps {
  status: StatusType;
  text?: string;
  className?: string;
}

const StatusBadge = ({ status, text, className }: StatusBadgeProps) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'success':
      case 'completed':
        return {
          variant: 'success' as const,
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
          text: text || 'Success',
        };
      case 'warning':
      case 'pending':
        return {
          variant: 'warning' as const,
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
          text: text || 'Pending',
        };
      case 'error':
        return {
          variant: 'destructive' as const,
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
          text: text || 'Error',
        };
      case 'processing':
        return {
          variant: 'info' as const,
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
          text: text || 'Processing',
        };
      default:
        return {
          variant: 'default' as const,
          icon: null,
          text: text || status,
        };
    }
  };

  const { variant, icon, text: displayText } = getStatusDetails();

  return (
    <Badge variant={variant} className={className}>
      {icon}
      {displayText}
    </Badge>
  );
};

export default StatusBadge;
