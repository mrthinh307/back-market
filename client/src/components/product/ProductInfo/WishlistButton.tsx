import React from 'react';

interface WishlistButtonProps {
  isWishlisted: boolean;
  onClick: () => void;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  isWishlisted,
  onClick,
}) => {
  return (
    <button
      aria-disabled='false'
      aria-label='Add to Favorites'
      className={`hover:bg-accent rounded-sm relative max-w-full select-none no-underline motion-safe:ease-in inline-flex h-12 items-center justify-center px-3 motion-safe:transition motion-safe:duration-300 cursor-pointer border-solid mx-3 border-2 ${
        isWishlisted ? 'border-red-500 bg-red-50' : 'border-foreground'
      }`}
      data-qa='my-favorites-toggle'
      type='button'
      onClick={onClick}
    >
      <svg
        aria-hidden='false'
        fill={isWishlisted ? 'currentColor' : 'foreground'}
        height='24'
        viewBox='0 0 24 24'
        width='24'
        xmlns='http://www.w3.org/2000/svg'
        className={`h-6 w-6 ${isWishlisted ? 'text-red-500' : 'text-foreground'}`}
      >
        <path
          fillRule='evenodd'
          d='M7.5 4.87a3.75 3.75 0 0 0-3.75 3.75c0 1.14.596 2.126 1.462 2.977l.014.014L12 19.01l6.774-7.4.014-.013c.866-.85 1.462-1.838 1.462-2.977a3.75 3.75 0 0 0-3.75-3.75c-.982 0-1.813.493-2.515 1.077a13.434 13.434 0 0 0-.7.634l-.209.197a4.47 4.47 0 0 1-.4.342C12.578 7.19 12.326 7.37 12 7.37c-.325 0-.578-.18-.676-.25a4.47 4.47 0 0 1-.4-.342L10.716 6.58c-.211-.2-.436-.414-.701-.634C9.313 5.363 8.482 4.87 7.5 4.87M2.25 8.62c0-2.9 2.35-5.25 5.25-5.25 1.503 0 2.672.757 3.474 1.423a15.976 15.976 0 0 1 .8.724A27.034 27.034 0 0 0 12 5.73a9.016 9.016 0 0 0 .226-.213 15.976 15.976 0 0 1 .8-.724c.802-.666 1.97-1.423 3.474-1.423 2.9 0 5.25 2.35 5.25 5.25 0 1.694-.888 3.038-1.896 4.033l-6.932 7.57a1.25 1.25 0 0 1-1.844 0l-6.932-7.57C3.138 11.658 2.25 10.313 2.25 8.62m9.51-2.692s.006-.005.017-.01a.077.077 0 0 1-.017.01m.463-.01a.087.087 0 0 1 .017.01l-.017-.01'
          clipRule='evenodd'
        ></path>
      </svg>
    </button>
  );
};

export default WishlistButton;
