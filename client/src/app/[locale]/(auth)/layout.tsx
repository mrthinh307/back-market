import { F2Header } from '@/components/layouts';

export default function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <F2Header />
      <main className='my-10 py-16'>{props.children}</main>
    </>
  );
}
