import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ProductPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onNext,
  onPrev,
}: ProductPaginationProps) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className='flex flex-col items-center space-y-4'>      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href='#'
              onClick={(e) => {
                e.preventDefault();
                onPrev();
              }}
              className={!hasPrevPage ? 'cursor-not-allowed opacity-60 bg-[#0e10160d] dark:bg-[#3a3a3a] pointer-events-none mx-0.5' : 'cursor-pointer'}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                  className={
                    currentPage === page
                      ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground cursor-pointer rounded-sm'
                      : 'cursor-pointer rounded-sm'
                  }
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext 
              href='#'
              onClick={(e) => {
                e.preventDefault();
                onNext();
              }}
              className={!hasNextPage ? 'cursor-not-allowed opacity-60 bg-[#0e10160d] dark:bg-[#3a3a3a] pointer-events-none mx-0.5' : 'cursor-pointer mx-0.5'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}