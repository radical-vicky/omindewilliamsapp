import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageContainer } from '@/components/layout/PageContainer';
import { CampusMap } from '@/components/map/CampusMap';
import { libraries } from '@/data/mockData';
import type { Library } from '@/types/library';
import { MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapPage = () => {
  const [selectedLibrary, setSelectedLibrary] = useState<Library | null>(null);

  return (
    <PageContainer>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-heading font-bold text-foreground mb-4"
      >
        Campus Libraries
      </motion.h1>

      <CampusMap
        libraries={libraries}
        selectedLibrary={selectedLibrary}
        onSelectLibrary={setSelectedLibrary}
        userLocation={{ lat: 51.5074, lng: -0.1278 }}
      />

      {selectedLibrary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-card border border-border rounded-2xl shadow-card"
        >
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            {selectedLibrary.name}
          </h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{selectedLibrary.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{selectedLibrary.openHours}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-card-foreground">
              {selectedLibrary.studySpaces.available} / {selectedLibrary.studySpaces.total}
            </span>
            <span className="text-muted-foreground">spaces available</span>
          </div>
          <Button variant="hero" className="w-full mt-4">
            Navigate Here
          </Button>
        </motion.div>
      )}
    </PageContainer>
  );
};

export default MapPage;