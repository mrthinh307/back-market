'use client';

import ErrorState from '@/components/ui/ErrorState';

function ProductError({ error }: { error: Error }) {
  return <ErrorState message={error.message} />;
}

export default ProductError;
