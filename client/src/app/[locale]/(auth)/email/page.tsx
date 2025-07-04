import { getTranslations } from 'next-intl/server';
import EmailForm from '@/components/form/EmailForm';

type ISignInPageProps = {
  params: Promise<{ locale: string }>;
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

export default async function EmailPage() {
  return <EmailForm />;
}
