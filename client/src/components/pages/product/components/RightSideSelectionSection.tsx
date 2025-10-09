import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import SelectionOptionButton from './SelectionOptionButton';

const ArrowRightIcon = () => (
  <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
    <path
      fillRule='evenodd'
      d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
      clipRule='evenodd'
    />
  </svg>
);

export const RightSideSelectionSection = memo(
  ({
    title,
    options,
    selectedOption,
    gridColumns = 2,
    showBadge = false,
  }: {
    title: string;
    options: {
      id: string;
      name: string;
      price: string;
      color?: string;
      isGoodDeal?: boolean;
    }[];
    selectedOption: string;
    gridColumns?: 1 | 2;
    showBadge?: boolean;
  }) => {
    const [loadingOptionId, setLoadingOptionId] = useState<string | null>(null);
    const [currentSelectedOption, setCurrentSelectedOption] =
      useState(selectedOption);
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
      setCurrentSelectedOption(selectedOption);
    }, [selectedOption]);

    const handleChangeOption = useCallback(
      async (optionId: string) => {
        if (optionId === currentSelectedOption || loadingOptionId) return;

        setCurrentSelectedOption(optionId);
        setLoadingOptionId(optionId);

        try {
          // Navigate to new variant page
          router.push(`/${locale}/product/${optionId}`);
        } catch (error) {
          console.error('Navigation error:', error);
          // Reset loading state nếu có lỗi
          setLoadingOptionId(null);
        }
      },
      [currentSelectedOption, loadingOptionId, router, locale],
    );

    const optionComponents = useMemo(
      () =>
        options.map((option) => {
          const isSelected = currentSelectedOption === option.id;
          const isLoading = loadingOptionId === option.id;
          const isDisabled = loadingOptionId !== null && !isLoading;

          return {
            key: option.id,
            option,
            isSelected,
            isLoading,
            isDisabled,
          };
        }),
      [options, currentSelectedOption, loadingOptionId],
    );

    return (
      <div className='md:w-[360px] md:shrink-0 min-[900px]:w-[456px]'>
        <div className='opacity-100 transition-opacity duration-500 ease-out'>
          <fieldset role='radiogroup'>
            <legend className='mb-3 flex items-baseline justify-between'>
              <h2 className='text-2xl md:text-3xl font-heading font-semibold text-secondary mb-2 hidden md:block'>
                <span>{title}</span>
              </h2>
            </legend>

            {/* Info button */}
            {showBadge && (
              <button className='bg-[#d9e4fc] dark:bg-[#1e293b] shadow-md rounded-lg relative no-underline transition-all duration-200 ease-in focus:outline-none cursor-pointer hover:shadow-lg mb-6 flex min-h-[72px] w-full flex-row items-center gap-3 px-4 py-3 md:flex'>
                <svg
                  className='h-6 w-6 md:h-8 md:w-8 ml-0'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  width={32}
                >
                  <path
                    fillRule='evenodd'
                    d='M3.69 3h16.62a1.58 1.58 0 0 1 1.581 1.577v14.846A1.58 1.58 0 0 1 20.31 21H3.69a1.579 1.579 0 0 1-1.581-1.577V4.577A1.579 1.579 0 0 1 3.69 3m5.933 14.453h3.262a.1.1 0 0 0 .07-.17l-5.167-5.167a.166.166 0 0 1 0-.233l5.167-5.168a.1.1 0 0 0-.07-.17H9.623a.39.39 0 0 0-.277.116l-5.222 5.222a.166.166 0 0 0 0 .233l5.222 5.222a.39.39 0 0 0 .277.115m10.173-.17-5.168-5.167a.166.166 0 0 1 0-.234l5.168-5.168a.1.1 0 0 0-.071-.17h-3.262a.39.39 0 0 0-.277.116l-5.222 5.222a.166.166 0 0 0 0 .233l5.222 5.223a.39.39 0 0 0 .277.115h3.262a.1.1 0 0 0 .07-.17'
                    clipRule='evenodd'
                  />
                </svg>
                <div className='text-sm flex-1 text-left text-secondary'>
                  <p className='mb-0'>
                    Refurbishers have restored devices to high quality based on
                    a 25-point inspection. Compare conditions
                  </p>
                </div>
                <ArrowRightIcon />
              </button>
            )}

            {/* Options */}
            <ul
              className={`list-none grid gap-x-3 gap-y-3 ${
                gridColumns === 2 ? 'grid-cols-2' : 'gap-y-3'
              }`}
            >
              {optionComponents.map(({ key, option, isSelected, isLoading, isDisabled }) => (
                <li key={key}>
                  <SelectionOptionButton
                    option={option}
                    isSelected={isSelected}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    gridColumns={gridColumns}
                    onOptionChange={handleChangeOption}
                    className={`${gridColumns === 2 && 'min-h-[70px]'}`}
                  />
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      </div>
    );
  },
);

export default RightSideSelectionSection;
