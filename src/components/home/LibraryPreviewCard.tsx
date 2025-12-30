import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users } from 'lucide-react';
import type { Library } from '@/types/library';
import { cn } from '@/lib/utils';

interface LibraryPreviewCardProps {
  library: Library;
  distance?: string;
  delay?: number;
}

const noiseLevelConfig = {
  quiet: { label: 'Quiet Zone', className: 'status-quiet' },
  moderate: { label: 'Moderate', className: 'status-busy' },
  collaborative: { label: 'Collaborative', className: 'status-available' },
};

export const LibraryPreviewCard = ({ library, distance, delay = 0 }: LibraryPreviewCardProps) => {
  const noiseConfig = noiseLevelConfig[library.noiseLevel];
  const availabilityPercent = Math.round(
    (library.studySpaces.available / library.studySpaces.total) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        to={`/map?library=${library.id}`}
        className="block bg-card rounded-2xl border border-border shadow-soft overflow-hidden transition-all duration-200 hover:shadow-card active:scale-[0.98]"
      >
        <div className="relative h-28 overflow-hidden">
          <img
            src={library.image}
            alt={library.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
            <h3 className="font-heading font-semibold text-primary-foreground text-sm">
              {library.name}
            </h3>
            {distance && (
              <span className="px-2 py-1 text-[10px] font-medium bg-card/90 backdrop-blur-sm rounded-full text-card-foreground">
                {distance}
              </span>
            )}
          </div>
        </div>

        <div className="p-3 space-y-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[100px]">{library.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{library.openHours.split(' - ')[1]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-card-foreground">
                {library.studySpaces.available}/{library.studySpaces.total} spaces
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={cn('status-dot', noiseConfig.className)} />
              <span className="text-xs text-muted-foreground">{noiseConfig.label}</span>
            </div>
          </div>

          {/* Availability bar */}
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                availabilityPercent > 50
                  ? 'bg-status-available'
                  : availabilityPercent > 20
                  ? 'bg-status-busy'
                  : 'bg-status-unavailable'
              )}
              style={{ width: `${availabilityPercent}%` }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
