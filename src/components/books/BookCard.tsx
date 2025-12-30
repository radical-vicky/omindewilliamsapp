import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, BookOpen, Smartphone } from 'lucide-react';
import type { Book } from '@/types/library';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
  delay?: number;
  variant?: 'default' | 'compact';
}

const statusConfig = {
  available: { label: 'Available', variant: 'default' as const },
  borrowed: { label: 'Borrowed', variant: 'secondary' as const },
  reserved: { label: 'Reserved', variant: 'outline' as const },
};

export const BookCard = ({ book, delay = 0, variant = 'default' }: BookCardProps) => {
  const status = statusConfig[book.status];

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
      >
        <Link
          to={`/book/${book.id}`}
          className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl shadow-soft hover:shadow-card transition-all duration-200 active:scale-[0.98]"
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-12 h-16 rounded-lg object-cover shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-semibold text-sm text-card-foreground truncate">
              {book.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">{book.author}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={status.variant} className="text-[10px] px-1.5 py-0">
                {status.label}
              </Badge>
              {book.hasDigitalVersion && (
                <Smartphone className="w-3 h-3 text-secondary" />
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        to={`/book/${book.id}`}
        className="block bg-card border border-border rounded-2xl shadow-soft overflow-hidden hover:shadow-card transition-all duration-200 active:scale-[0.98]"
      >
        <div className="flex p-4 gap-4">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-20 h-28 rounded-xl object-cover shadow-card"
          />
          <div className="flex-1 min-w-0 py-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-semibold text-card-foreground line-clamp-2">
                {book.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{book.category}</p>

            <div className="flex items-center gap-3 mt-3">
              <Badge variant={status.variant}>{status.label}</Badge>
              {book.hasDigitalVersion && (
                <div className="flex items-center gap-1 text-secondary">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">eBook</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {book.libraryName} • Floor {book.floor} • {book.shelfNumber}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
