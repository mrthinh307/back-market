import Image from 'next/image';
import logo from '@/public/assets/images/header-logo-1.svg';

function LoadingPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className="bg-white min-h-16 flex justify-start items-center px-8 py-4">
        <div className="h-[14px] shrink-0 text-content">
          <Image src={logo} alt="logo" className="h-full w-auto" />
        </div>
      </header>
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="flex items-center justify-center mb-4 relative">
          <div className="relative flex items-center justify-center w-24 h-24">
            <svg
              aria-hidden="true"
              fill="currentColor"
              height="24"
              viewBox="0 0 48 48"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute size-15"
              data-test="icon-sun-face"
            >
              <g clipPath="url(#h5a1c5a)">
                <path d="M24 0a24 24 0 1 0 0 48 24 24 0 0 0 0-48m3.3 9.336c1.044-.168 2.172 1.38 2.52 3.444.348 2.064-.204 3.888-1.2 4.044-.996.156-2.172-1.38-2.52-3.444-.348-2.064.168-3.876 1.2-4.044m-7.116.9c1.056 0 1.956 1.656 1.992 3.756.036 2.1-.78 3.816-1.836 3.84-1.056.024-1.944-1.668-1.98-3.768-.036-2.1.768-3.804 1.824-3.828m14.316 8.58a13.416 13.416 0 0 1-3.804 3.192 15.334 15.334 0 0 1-2.292 1.068 17.334 17.334 0 0 1-2.46.672 16.152 16.152 0 0 1-9.864-1.284.455.455 0 0 1-.216-.624.493.493 0 0 1 .576-.24 17.869 17.869 0 0 0 9.18.588 17.222 17.222 0 0 0 4.308-1.524c1.38-.7 2.682-1.54 3.888-2.508a.492.492 0 0 1 .672.072.456.456 0 0 1 .012.588"></path>
              </g>
              <defs>
                <clipPath id="h5a1c5a">
                  <path d="M0 0h48v48H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </div>
          <svg
            aria-hidden="true"
            fill="currentColor"
            height="24"
            viewBox="0 0 48 48"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute size-24 animate-spin"
            data-test="icon-sun-beam"
          >
            <g clipPath="url(#603szaa)">
              <path d="M24 2.398 28.633 6.7l6.17-1.39 1.85 5.993 6.001 1.87-1.416 6.15 4.369 4.65-4.31 4.627 1.393 6.161-6.002 1.846-1.873 5.994-6.158-1.415L24 45.55l-4.633-4.303-6.17 1.39-1.85-5.993-6.085-1.882 1.416-6.149-4.285-4.639 4.31-4.627-1.393-6.161 6.002-1.846 1.873-5.994 6.158 1.415L24 2.398M24 0a2.402 2.402 0 0 0-1.62.636l-3.722 3.428-4.921-1.139a2.982 2.982 0 0 0-.54-.06 2.402 2.402 0 0 0-2.257 1.69L9.44 9.35l-4.802 1.486a2.4 2.4 0 0 0-1.633 2.817l1.117 4.927-3.482 3.716a2.396 2.396 0 0 0 0 3.26l3.434 3.716-1.14 4.915a2.394 2.394 0 0 0 1.62 2.829l4.801 1.498 1.489 4.795a2.396 2.396 0 0 0 2.353 1.726 2.038 2.038 0 0 0 .528 0l4.933-1.115 3.697 3.44a2.401 2.401 0 0 0 3.266 0l3.72-3.428 4.922 1.199a2.988 2.988 0 0 0 .54 0 2.402 2.402 0 0 0 2.293-1.69l1.5-4.795 4.802-1.486a2.4 2.4 0 0 0 1.633-2.817l-1.117-4.927 3.446-3.692a2.395 2.395 0 0 0 0-3.26l-3.434-3.716 1.2-4.915a2.394 2.394 0 0 0-1.632-2.829l-4.801-1.498-1.489-4.795a2.397 2.397 0 0 0-2.4-1.798 2.042 2.042 0 0 0-.529.06l-4.933 1.115-3.662-3.44A2.402 2.402 0 0 0 24 0"></path>
            </g>
            <defs>
              <clipPath id="603szaa">
                <path d="M0 0h48v48H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h3 className='text-xl font-duplet-bold'>Loading your goodies !</h3>
      </div>
    </div>
  );
}

export default LoadingPage;
