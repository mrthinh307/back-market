import { FilterSection } from './FilterSection';
import { SortDropdown } from './SortDropdown';

interface ProductListToolbarProps {
  currentSort?: string;
  onSortChange?: (sortId: string) => void;
}

export function ProductListToolbar({ 
  currentSort, 
  onSortChange 
}: ProductListToolbarProps) {
  return (
    <div className='container px-6 py-4'>
      <div className='flex items-center lg:justify-between gap-2 overflow-auto scrollbar-none'>
        <FilterSection />
        <SortDropdown 
          currentSort={currentSort} 
          onSortChange={onSortChange} 
        />
      </div>
    </div>
  );
}