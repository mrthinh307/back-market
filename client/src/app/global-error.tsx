'use client';
import GlobalErrorComponent from '@/components/pages/GlobalErrorComponent';

function GlobalError() {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='antialiased'>
        <GlobalErrorComponent
          headerComponent='f2-header'
          statusCode='5xx'
          message='Something went wrong!'
          buttonText='Try to refresh'
          onButtonClick={() => {
            window.location.reload();
          }}
        />
      </body>
    </html>
  );
}

export default GlobalError;
