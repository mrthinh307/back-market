import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';

// Sort constants
const SORT_OPTIONS = {
  current: 'Best sellers',
  options: [
    { id: 'best-sellers', label: 'Best sellers' },
    { id: 'price-low-high', label: 'Price: Low to High' },
    { id: 'price-high-low', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest First' },
    { id: 'rating', label: 'Customer Rating' },
  ],
};

interface SortDropdownProps {
  currentSort?: string;
  onSortChange?: (sortId: string) => void;
}

export function SortDropdown({ 
  currentSort = SORT_OPTIONS.current, 
  onSortChange 
}: SortDropdownProps) {
  const handleSortSelect = (sortId: string) => {
    onSortChange?.(sortId);
  };

  return (
    <Popover>
      <PopoverTrigger className='rounded-full flex h-8 items-center gap-x-3 px-3 text-sm bg-input-hover dark:bg-input hover:bg-input cursor-pointer'>
        <span>
          Sort <strong>{currentSort}</strong>
        </span>
        <ChevronDownIcon className='size-4' />
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-2'>
          {SORT_OPTIONS.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSortSelect(option.id)}
              className='text-left px-2 py-1 hover:bg-input-hover rounded text-sm transition-colors'
            >
              {option.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}