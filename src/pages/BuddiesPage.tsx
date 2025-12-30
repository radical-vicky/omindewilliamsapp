import { motion } from 'framer-motion';
import { PageContainer } from '@/components/layout/PageContainer';
import { studyBuddies } from '@/data/mockData';
import { MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const statusConfig = {
  studying: { label: 'Studying', className: 'status-busy' },
  available: { label: 'Available', className: 'status-available' },
  busy: { label: 'Busy', className: 'status-unavailable' },
};

const BuddiesPage = () => {
  return (
    <PageContainer>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-heading font-bold text-foreground mb-6"
      >
        Study Buddies
      </motion.h1>

      <div className="space-y-3">
        {studyBuddies.map((buddy, i) => {
          const status = statusConfig[buddy.status];
          return (
            <motion.div
              key={buddy.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="p-4 bg-card border border-border rounded-2xl shadow-soft"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={buddy.avatar}
                    alt={buddy.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className={cn('absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card', status.className)} />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-card-foreground">{buddy.name}</h4>
                  <p className="text-sm text-muted-foreground">{buddy.subject}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{buddy.libraryName}</span>
                    </div>
                    {buddy.until && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Until {buddy.until}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default BuddiesPage;