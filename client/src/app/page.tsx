import { redirect } from 'next/navigation';
import { routing } from '@/libs/I18nRouting';

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
