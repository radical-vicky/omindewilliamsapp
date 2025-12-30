import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
}

export const PageContainer = ({ children, className, header }: PageContainerProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {header}
      <main className={cn('px-4 py-4', className)}>
        {children}
      </main>
    </div>
  );
};
