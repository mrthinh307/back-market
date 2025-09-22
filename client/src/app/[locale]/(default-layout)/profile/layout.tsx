"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useSelectedLayoutSegment } from "next/navigation";
import clsx from "clsx";

export default function ProfileSectionLayout({
  children,
}: { children: React.ReactNode }) {
  const locale = useLocale();
  // null -> /profile, "orders" -> /profile/orders, "favourites" -> /profile/favourites
  const segment = useSelectedLayoutSegment();

  const tabs = [
    { key: null as null | "orders" | "favourites", label: "Profile",     href: `/${locale}/profile` },
    { key: "orders" as const,                          label: "Orders",      href: `/${locale}/profile/orders` },
    { key: "favourites" as const,                      label: "Favourites",  href: `/${locale}/profile/favourites` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav
        aria-label="Dashboard main navigation"
        className="relative -mx-4 px-4 overflow-x-auto"
      >
        <div className="w-max mx-auto">
          <ul
            className="
              flex list-none 
              gap-8 sm:gap-12 lg:gap-16
            "
          >
            {tabs.map((t) => {
              const isActive = segment === t.key;
              return (
                <li key={t.href} className="relative flex h-14 items-center">
                  <Link
                    href={t.href}
                    className={clsx(
                      "relative pb-2 text-gray-600 hover:text-black transition-colors",
                      "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-black after:origin-left after:transition-transform hover:after:scale-x-100",
                      isActive ? "text-black font-medium after:scale-x-100" : "after:scale-x-0"
                    )}
                  >
                    {t.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>




      {children}
    </div>
  );
}
