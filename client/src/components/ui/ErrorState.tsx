import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  refetch?: () => void;
  message?: string;
}

type ErrorProps = {
  error?: Error & { digest?: string };
  reset?: () => void;
};

function ErrorState({
  error,
  reset,
  refetch,
  message,
}: ErrorProps & ErrorStateProps) {
  return (
    <div className='content-center flex-col py-15 md:py-30'>
      <AlertCircle className='h-10 w-10 text-destructive' />
      <p className='mt-4 text-lg' role='alert' aria-live='polite'>
        {message ??
          error?.message ??
          'Oops. It looks like this link has not been refurbished yet. Please try again later!'}
      </p>
      {refetch && (
        <Button onClick={refetch} className='mt-4'>
          Try Again
        </Button>
      )}
      {reset && (
        <Button onClick={reset} className='mt-4'>
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
