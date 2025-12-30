import { motion } from 'framer-motion';
import type { StudyBuddy } from '@/types/library';
import { cn } from '@/lib/utils';

interface StudyBuddyChipProps {
  buddy: StudyBuddy;
  delay?: number;
}

const statusConfig = {
  studying: { label: 'Studying', className: 'status-busy' },
  available: { label: 'Available', className: 'status-available' },
  busy: { label: 'Busy', className: 'status-unavailable' },
};

export const StudyBuddyChip = ({ buddy, delay = 0 }: StudyBuddyChipProps) => {
  const status = statusConfig[buddy.status];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center gap-2 p-2 pr-3 bg-card border border-border rounded-full shadow-soft hover:shadow-card transition-all duration-200 active:scale-[0.98]"
    >
      <div className="relative">
        <img
          src={buddy.avatar}
          alt={buddy.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div
          className={cn(
            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card',
            status.className
          )}
        />
      </div>
      <div className="text-left">
        <p className="text-xs font-medium text-card-foreground leading-tight">
          {buddy.name}
        </p>
        <p className="text-[10px] text-muted-foreground leading-tight">
          {buddy.subject}
        </p>
      </div>
    </motion.button>
  );
};
