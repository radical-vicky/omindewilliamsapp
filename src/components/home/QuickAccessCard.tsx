import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface QuickAccessCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  delay?: number;
}

const variantStyles = {
  default: 'bg-card border-border hover:border-primary/30',
  primary: 'bg-primary/5 border-primary/20 hover:border-primary/40',
  secondary: 'bg-secondary/30 border-secondary/30 hover:border-secondary/50',
  accent: 'bg-accent/5 border-accent/20 hover:border-accent/40',
};

const iconVariantStyles = {
  default: 'bg-muted text-foreground',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/20 text-secondary',
  accent: 'bg-accent/10 text-accent',
};

export const QuickAccessCard = ({
  to,
  icon: Icon,
  title,
  subtitle,
  badge,
  variant = 'default',
  delay = 0,
}: QuickAccessCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        to={to}
        className={cn(
          'block p-4 rounded-2xl border shadow-soft transition-all duration-200 hover:shadow-card active:scale-[0.98]',
          variantStyles[variant]
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex items-center justify-center w-11 h-11 rounded-xl shrink-0',
              iconVariantStyles[variant]
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-semibold text-card-foreground truncate">
                {title}
              </h3>
              {badge && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-primary text-primary-foreground rounded-full">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
              {subtitle}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
