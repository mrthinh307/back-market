import React from 'react';

interface BreadcrumbItem {
  name: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  isMobile?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, isMobile = false }) => {
  if (isMobile) {
    return (
      <nav aria-label='Breadcrumb' className='bg-surface-default-low md:hidden'>
        <ol
          className='m-0 flex list-none items-center py-8 md:py-12'
          itemType='http://schema.org/BreadcrumbList'
        >
          {items.map((item, index) => (
            <li
              key={index}
              className='text-action-default-low caption-bold flex py-8 md:body-2-bold'
              itemProp='itemListElement'
              itemType='http://schema.org/ListItem'
            >
              {item.href ? (
                <a
                  href={item.href}
                  rel='noreferrer noopener'
                  className='text-action-default-low flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline'
                  itemProp='item'
                >
                  <span className='truncate' itemProp='name'>
                    {item.name}
                  </span>
                </a>
              ) : (
                <span className='truncate' itemProp='name'>
                  {item.name}
                </span>
              )}
              {index < items.length - 1 && (
                <span aria-hidden='true' className='mx-4'>
                  •
                </span>
              )}
              <meta content={String(index + 1)} itemProp='position' />
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav
      aria-label='Breadcrumb'
      className='bg-surface-default-low hidden md:block'
    >
      <ol
        className='m-0 flex md:py-8'
        itemType='http://schema.org/BreadcrumbList'
      >
        {items.map((item, index) => (
          <li
            key={index}
            className='text-action-default-hi md:flex md:shrink-0 hidden'
            itemProp='itemListElement'
            itemType='http://schema.org/ListItem'
          >
            {item.href ? (
              <a
                href={item.href}
                rel='noreferrer noopener'
                className='flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline'
                itemProp='item'
              >
                <span
                  className='body-2-bold truncate font-bold'
                  itemProp='name'
                >
                  {item.name}
                </span>
              </a>
            ) : (
              <div aria-current='page' className='font-heading' itemProp='name'>
                {item.name}
              </div>
            )}
            {index < items.length - 1 && (
              <svg
                aria-hidden='true'
                fill='currentColor'
                height='24'
                viewBox='0 0 24 24'
                width='24'
                xmlns='http://www.w3.org/2000/svg'
                className='hidden md:mx-3 md:block'
              >
                <path
                  fillRule='evenodd'
                  d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
                  clipRule='evenodd'
                ></path>
              </svg>
            )}
            <meta content={String(index + 1)} itemProp='position' />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
