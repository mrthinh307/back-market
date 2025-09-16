import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronDownIcon, SlidersHorizontalIcon } from 'lucide-react';

// Filter constants
const FILTER_OPTIONS = [
  { id: 'price', label: 'Price', type: 'popover' },
  { id: 'model', label: 'Model', type: 'popover' },
  { id: 'storage', label: 'Storage', type: 'popover' },
  { id: 'filter', label: 'Filter', type: 'sheet', icon: SlidersHorizontalIcon },
] as const;

export function FilterSection() {
  return (
    <div className='flex items-center gap-2'>
      {FILTER_OPTIONS.map((filter) => {
        if (filter.type === 'sheet') {
          const IconComponent = filter.icon;
          return (
            <Sheet key={filter.id}>
              <SheetTrigger className='rounded-full flex h-8 items-center gap-x-3 px-3 text-sm bg-input-hover dark:bg-input hover:bg-input cursor-pointer'>
                <span>{filter.label}</span>
                {IconComponent && <IconComponent className='size-4' />}
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                  <SheetDescription>
                    Select your filter criteria to find the perfect product.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          );
        }

        return (
          <Popover key={filter.id}>
            <PopoverTrigger className='rounded-full flex h-8 items-center gap-x-3 px-3 text-sm bg-input-hover dark:bg-input hover:bg-input cursor-pointer'>
              <span>{filter.label}</span>
              <ChevronDownIcon className='size-4' />
            </PopoverTrigger>
            <PopoverContent>
              Place content for the {filter.label.toLowerCase()} filter here.
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}