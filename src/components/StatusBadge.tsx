import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  status: 'checking' | 'alive' | 'dead' | 'expired';
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const config = {
    checking: {
      icon: Clock,
      className: 'bg-gray-100 text-gray-600',
      text: 'Checking'
    },
    alive: {
      icon: CheckCircle,
      className: 'bg-green-100 text-green-600',
      text: 'Active'
    },
    dead: {
      icon: AlertCircle,
      className: 'bg-yellow-100 text-yellow-600',
      text: 'DNS Only'
    },
    expired: {
      icon: XCircle,
      className: 'bg-red-100 text-red-600',
      text: 'Expired'
    }
  };

  const { icon: Icon, className, text } = config[status];

  return (
    <span className={clsx('inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium', className)}>
      <Icon size={16} />
      {text}
    </span>
  );
};