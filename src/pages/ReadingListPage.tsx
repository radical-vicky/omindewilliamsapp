import { motion } from 'framer-motion';
import { PageContainer } from '@/components/layout/PageContainer';
import { BookCard } from '@/components/books/BookCard';
import { myReadingList, myReservations } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

const ReadingListPage = () => {
  return (
    <PageContainer>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-heading font-bold text-foreground mb-6"
      >
        My Reading
      </motion.h1>

      {myReservations.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Reservations</h2>
          <div className="space-y-3">
            {myReservations.map((res) => (
              <BookCard key={res.id} book={res.book} variant="compact" />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Reading List</h2>
        <div className="space-y-4">
          {myReadingList.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="p-4 bg-card border border-border rounded-2xl shadow-soft"
            >
              <div className="flex gap-3">
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-14 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-card-foreground">{item.book.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.book.author}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-primary">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-1.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
};

export default ReadingListPage;