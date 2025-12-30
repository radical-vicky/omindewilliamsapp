import { motion } from 'framer-motion';
import { Search, BookMarked, Map, BookOpen, Bell } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { QuickAccessCard } from '@/components/home/QuickAccessCard';
import { LibraryPreviewCard } from '@/components/home/LibraryPreviewCard';
import { StudyBuddyChip } from '@/components/home/StudyBuddyChip';
import { libraries, studyBuddies, myReservations } from '@/data/mockData';

const Index = () => {
  const nearestLibraries = libraries.slice(0, 2);
  const activeBuddies = studyBuddies.filter((b) => b.status !== 'busy').slice(0, 4);

  return (
    <PageContainer>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <p className="text-sm text-muted-foreground">Good afternoon</p>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Welcome back, Student
        </h1>
      </motion.div>

      {/* Notification Banner */}
      {myReservations.some((r) => r.status === 'ready') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl">
              <Bell className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Book Ready for Pickup!</p>
              <p className="text-xs text-muted-foreground">
                "Clean Code" is waiting at Science & Tech Hub
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Access Grid */}
      <section className="mb-8">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3">
          <QuickAccessCard
            to="/search"
            icon={Search}
            title="Find Books"
            subtitle="Search catalog"
            variant="primary"
            delay={0.1}
          />
          <QuickAccessCard
            to="/reading-list"
            icon={BookMarked}
            title="Reservations"
            subtitle="1 ready"
            badge="1"
            variant="secondary"
            delay={0.15}
          />
          <QuickAccessCard
            to="/map"
            icon={Map}
            title="Campus Map"
            subtitle="Navigate libraries"
            delay={0.2}
          />
          <QuickAccessCard
            to="/reading-list"
            icon={BookOpen}
            title="Reading Lists"
            subtitle="2 books in progress"
            variant="accent"
            delay={0.25}
          />
        </div>
      </section>

      {/* Nearby Libraries */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Nearby Libraries</h2>
          <a href="/map" className="text-sm text-primary font-medium">View all</a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {nearestLibraries.map((library, i) => (
            <div key={library.id} className="w-[280px] shrink-0">
              <LibraryPreviewCard library={library} distance={i === 0 ? '2 min' : '5 min'} delay={0.1 * i} />
            </div>
          ))}
        </div>
      </section>

      {/* Study Buddies */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Friends Studying</h2>
          <a href="/buddies" className="text-sm text-primary font-medium">See all</a>
        </div>
        <div className="flex flex-wrap gap-2">
          {activeBuddies.map((buddy, i) => (
            <StudyBuddyChip key={buddy.id} buddy={buddy} delay={0.05 * i} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
};

export default Index;