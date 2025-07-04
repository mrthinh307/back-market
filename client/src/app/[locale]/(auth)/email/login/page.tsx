import PasswordForm from '@/components/form/PasswordForm';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

type ISignInPageProps = {
  params: { locale: string };
};

export async function generateMetadata(props: ISignInPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'EmailForm',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignInPage() {
  const email = (await cookies()).get('email')?.value || '';
  return <PasswordForm email={email} />;
}
