'use client';

import GlobalErrorComponent from '@/components/pages/GlobalErrorComponent';

function ProductError({
  error,
}: {
  error: Error & { digest?: string; statusCode?: number };
}) {
  // Extract status code from error, default to 500
  console.log(error);
  const statusCode = (error as any).statusCode || (error as any).status || 500;

  const defaultMessage = `If you’re here, it might be because this product isn’t available right now. Please try again later.`;

  return (
    <GlobalErrorComponent
      statusCode={String(statusCode)}
      title='Oops! This product is taking a nap :))'
      message={defaultMessage}
      onButtonClick={() => {
        window.history.back();
      }}
    />
  );
}

export default ProductError;
