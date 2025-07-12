import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import AuthFormContainer from '@/components/form/AuthFormContainer';
import SignUpCredentials from '@/components/form/SignUpCredentials';

type ISignInPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignInPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'EmailCredentials',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignUpPage(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUpCredentials',
  });
  const email = (await cookies()).get('email')?.value || '';

  return (
    <AuthFormContainer
      email={email}
      formTitle={t('signup_title')}
      formSubtitle={t('signup_subtitle')}
    >
      <SignUpCredentials email={email} />
    </AuthFormContainer>
  );
}
