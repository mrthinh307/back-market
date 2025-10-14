import { getTranslations } from 'next-intl/server';

import AuthFormContainer from '@/components/form/AuthFormContainer';
import EmailCredentials from '@/components/form/EmailCredentials';

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

export default async function EmailPage(props: ISignInPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'EmailCredentials',
  });

  return (
    <>
      <AuthFormContainer
        formTitle={t('email_form_title')}
        showPrivacyPolicyLabel={true}
      >
        <EmailCredentials />
      </AuthFormContainer>
    </>
  );
}
