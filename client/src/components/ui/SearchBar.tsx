import { useTranslations } from 'next-intl';
import { useState } from 'react';

function SearchBar({ label }: { label?: string }) {
  const [query, setQuery] = useState('');
  const t = useTranslations('Header');

  return (
    <div className="flex gap-4 w-full">
      <div className="flex items-center bg-input-hover dark:bg-input hover:bg-[#d8d9df] rounded-full flex-row-reverse w-full gap-2 px-2">
        <button
          aria-label="Reset search bar"
          className="rounded-sm h-8 w-8 cursor-pointer content-center"
          type="reset"
          style={{ display: query ? 'flex' : 'none' }}
          onClick={() => setQuery('')}
        >
          ✕
        </button>
        <input
          className="appearance-none bg-transparent outline-none h-10 w-full text-ellipsis placeholder:text-muted"
          placeholder={label || t('search_bar_placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          aria-label="Search"
          className="rounded-sm h-8 w-8 shrink-0 cursor-pointer content-center"
          type="submit"
        >
          <svg
            aria-hidden="true"
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2.25a7.75 7.75 0 1 0 4.924 13.735l5.546 5.545a.75.75 0 1 0 1.06-1.06l-5.545-5.546A7.75 7.75 0 0 0 10 2.25M3.75 10a6.25 6.25 0 1 1 12.5 0 6.25 6.25 0 0 1-12.5 0"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <button className="md:hidden" type="button" style={{ display: 'none' }}>
        Cancel
      </button>
    </div>
  );
}

export default SearchBar;
