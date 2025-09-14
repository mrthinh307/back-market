import React, { memo } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getColorHex } from '@/utils/string';

interface OptionData {
  id: string;
  name: string;
  price: string;
  color?: string;
  isGoodDeal?: boolean;
}

interface SelectionOptionButtonProps {
  option: OptionData;
  isSelected: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  gridColumns: 1 | 2;
  onOptionChange: (optionId: string) => void;
}

export const SelectionOptionButton = memo<SelectionOptionButtonProps>(
  ({
    option,
    isSelected,
    isLoading,
    isDisabled,
    gridColumns,
    onOptionChange,
  }) => {
    option.color = getColorHex(option.name);
    
    return (
      <button
        disabled={isDisabled}
        className={`cursor-pointer focus:outline-none rounded-sm relative flex size-full flex-col border border-primary py-3 no-underline transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${
          isSelected
            ? 'bg-[#f6f2fd] dark:bg-accent dark:border-foreground'
            : 'bg-transparent dark:bg-sub-background dark:border-border hover:bg-input-hover'
        }`}
        onClick={() => onOptionChange(option.id)}
      >
        <div className='m-auto flex w-full flex-row items-center pl-2 pr-4'>
          {isLoading ? (
            <div className='content-center size-full'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className='shrink-0'>
                <div className='flex size-6 items-center justify-center'>
                  {option.color ? (
                    <div
                      className='border border-[rgba(14,16,22,.4)] rounded-md size-4'
                      style={{ backgroundColor: option.color }}
                    />
                  ) : (
                    <div
                      className={`rounded-full border transition-colors duration-200 size-3 ${
                        isSelected
                          ? 'bg-primary border-foreground'
                          : 'bg-transparent border-primary dark:border-border'
                      }`}
                    />
                  )}
                </div>
              </div>
              <div className='ml-4 flex grow'>
                <div
                  className={`flex grow flex-nowrap text-left ${gridColumns === 2 ? 'flex-col' : ''}`}
                >
                  <span
                    className={`mr-2 min-w-[100px] grow transition-colors duration-200 ${
                      isSelected ? 'font-semibold' : ''
                    }`}
                  >
                    {option.name}
                  </span>
                  <span
                    className={`text-sm flex shrink-0 items-center gap-1 font-duplet ${
                      option.isGoodDeal
                        ? 'text-green-700'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {option.isGoodDeal && (
                      <svg
                        className='h-6 w-6'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M6.166 5.106a.75.75 0 1 0-1.06 1.06l11.447 11.448h-5.26a.75.75 0 1 0 0 1.5h6.57a1.25 1.25 0 0 0 1.25-1.25v-6.571a.75.75 0 0 0-1.5 0v5.26L6.167 5.106' />
                      </svg>
                    )}
                    {option.price}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </button>
    );
  },
);

SelectionOptionButton.displayName = 'SelectionOptionButton';

export default SelectionOptionButton;
