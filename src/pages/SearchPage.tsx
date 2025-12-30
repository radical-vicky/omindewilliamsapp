import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PageContainer } from '@/components/layout/PageContainer';
import { SearchBar } from '@/components/search/SearchBar';
import { BookCard } from '@/components/books/BookCard';
import { books } from '@/data/mockData';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const filteredBooks = useMemo(() => {
    if (!query) return books;
    const q = query.toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <PageContainer>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-heading font-bold text-foreground mb-4"
      >
        Find Books
      </motion.h1>

      <SearchBar value={query} onChange={setQuery} />

      <div className="mt-6 space-y-3">
        {filteredBooks.map((book, i) => (
          <BookCard key={book.id} book={book} delay={0.05 * i} />
        ))}
        {filteredBooks.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No books found</p>
        )}
      </div>
    </PageContainer>
  );
};

export default SearchPage;