import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export function useRouterRedirect() {
  const router = useRouter();
  const locale = useLocale();

  const redirectToHome = () => {
    router.push(`/${locale}`);
  };

  const redirectToLogin = () => {
    router.push(`/${locale}/email`);
  };

  return { redirectToHome, redirectToLogin };
}
