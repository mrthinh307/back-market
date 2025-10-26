import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import AuthFormContainer from '@/components/form/AuthFormContainer';
import LoginCredentials from '@/components/form/LoginCredentials';

type ISignInPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignInPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'LoginCredentials',
  });

  return {
    title: t('meta_title'),
  };
}

export default async function SignInPage(props: ISignInPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'LoginCredentials',
  });
  const email = (await cookies()).get('email')?.value || '';

  return (
    <AuthFormContainer
      email={email}
      formTitle={t('glad_to_see_you')}
      formSubtitle={t('enter_your_password')}
    >
      <LoginCredentials email={email} />
    </AuthFormContainer>
  );
}
