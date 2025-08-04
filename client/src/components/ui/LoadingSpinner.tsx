interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeMap = {
    small: 4,
    medium: 6,
    large: 8,
  };

  const spinnerSize = sizeMap[size];

  return (
    <svg
      aria-hidden='false'
      aria-label='Loading'
      fill='currentColor'
      height={spinnerSize * 4}
      role='img'
      viewBox='0 0 24 24'
      width={spinnerSize * 4}
      xmlns='http://www.w3.org/2000/svg'
      className={`animate-spin text-inherit !size-${spinnerSize}`}
    >
      <path
        fillRule='evenodd'
        d='M12 3.75A8.25 8.25 0 1 0 20.25 12a.75.75 0 0 1 1.5 0c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25a.75.75 0 0 1 0 1.5'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export default LoadingSpinner;
