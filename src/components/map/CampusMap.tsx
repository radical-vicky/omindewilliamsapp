import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Volume2, VolumeX, Wifi } from 'lucide-react';
import type { Library } from '@/types/library';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CampusMapProps {
  libraries: Library[];
  selectedLibrary: Library | null;
  onSelectLibrary: (library: Library) => void;
  userLocation?: { lat: number; lng: number };
}

const noiseLevelIcons = {
  quiet: VolumeX,
  moderate: Volume2,
  collaborative: Wifi,
};

export const CampusMap = ({
  libraries,
  selectedLibrary,
  onSelectLibrary,
  userLocation,
}: CampusMapProps) => {
  const [hoveredLibrary, setHoveredLibrary] = useState<string | null>(null);

  // Simulated campus map positions (percentage based for responsive layout)
  const libraryPositions: Record<string, { x: number; y: number }> = {
    'lib-1': { x: 50, y: 40 },
    'lib-2': { x: 75, y: 25 },
    'lib-3': { x: 25, y: 60 },
    'lib-4': { x: 65, y: 70 },
  };

  return (
    <div className="relative w-full h-[400px] bg-muted rounded-2xl overflow-hidden border border-border shadow-card">
      {/* Campus background pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#campus-grid)" />
        </svg>
      </div>

      {/* Campus paths */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 50 100 Q 50 60 50 40 Q 50 30 60 25 L 75 25"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 50 40 Q 40 50 25 60"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 50 40 Q 55 55 65 70"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      {/* User location */}
      {userLocation && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute z-20"
          style={{ left: '50%', top: '85%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-secondary rounded-full shadow-glow" />
            <div className="absolute inset-0 w-4 h-4 bg-secondary rounded-full animate-ping opacity-50" />
          </div>
        </motion.div>
      )}

      {/* Library markers */}
      {libraries.map((library) => {
        const position = libraryPositions[library.id];
        if (!position) return null;

        const isSelected = selectedLibrary?.id === library.id;
        const isHovered = hoveredLibrary === library.id;
        const NoiseIcon = noiseLevelIcons[library.noiseLevel];

        return (
          <motion.div
            key={library.id}
            className="absolute z-10"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => onSelectLibrary(library)}
              onMouseEnter={() => setHoveredLibrary(library.id)}
              onMouseLeave={() => setHoveredLibrary(null)}
              className={cn(
                'relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300',
                isSelected || isHovered
                  ? 'bg-primary shadow-glow scale-110'
                  : 'bg-card border border-border shadow-card hover:scale-105'
              )}
            >
              <MapPin
                className={cn(
                  'w-5 h-5 transition-colors',
                  isSelected || isHovered ? 'text-primary-foreground' : 'text-primary'
                )}
              />

              {/* Availability indicator */}
              <div
                className={cn(
                  'absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-card flex items-center justify-center',
                  library.studySpaces.available > library.studySpaces.total * 0.5
                    ? 'bg-status-available'
                    : library.studySpaces.available > library.studySpaces.total * 0.2
                    ? 'bg-status-busy'
                    : 'bg-status-unavailable'
                )}
              >
                <span className="text-[8px] font-bold text-primary-foreground">
                  {library.studySpaces.available}
                </span>
              </div>
            </button>

            {/* Library name tooltip */}
            {(isSelected || isHovered) && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-card border border-border rounded-lg shadow-elevated whitespace-nowrap"
              >
                <p className="text-xs font-semibold text-card-foreground">{library.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <NoiseIcon className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground capitalize">
                    {library.noiseLevel}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Navigation button */}
      <Button
        variant="hero"
        size="icon-lg"
        className="absolute bottom-4 right-4 z-20"
      >
        <Navigation className="w-5 h-5" />
      </Button>
    </div>
  );
};
