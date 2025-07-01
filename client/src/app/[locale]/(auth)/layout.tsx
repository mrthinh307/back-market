import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/assets/images/header-logo-1.svg';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <header className='bg-white min-h-16 flex justify-start items-center px-8 py-4'>
        <Link href='/' className='h-[14px] shrink-0 text-content'>
          <Image src={logo} alt='logo' className='h-full w-auto' />
        </Link>
      </header>
      <main>
        {props.children}
      </main>
    </>
  );
}
