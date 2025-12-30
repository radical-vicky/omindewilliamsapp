import { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
  showFilters?: boolean;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search books, authors, ISBN...',
  onFilterClick,
  showFilters = true,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-3 bg-card border rounded-2xl shadow-soft transition-all duration-200',
        isFocused ? 'border-primary shadow-card' : 'border-border'
      )}
    >
      <Search
        className={cn(
          'w-5 h-5 shrink-0 transition-colors duration-200',
          isFocused ? 'text-primary' : 'text-muted-foreground'
        )}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-body"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onChange('')}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
      {showFilters && onFilterClick && (
        <button
          onClick={onFilterClick}
          className="p-2 -mr-2 hover:bg-muted rounded-xl transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
};
