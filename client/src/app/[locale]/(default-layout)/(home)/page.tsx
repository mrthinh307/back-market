import { Banner } from '@/components/pages/home/components';
import HomePage from '@/components/pages/home/HomePage';

export default function Home() {
  return (
    <main className='mx-auto'>
      {/* BANNER */}
      <Banner />
      {/* HOME PAGE */}
      <HomePage />
    </main>
  );
}
