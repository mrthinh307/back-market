import { useIsMobile } from './use-mobile';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface UseBreadcrumbOptions {
  /**
   * Number of items to show on mobile devices
   * @default 2 (last link + current page)
   */
  mobileItemCount?: number;
  /**
   * Whether to enable mobile filtering
   * @default true
   */
  enableMobileFiltering?: boolean;
}

export function useBreadcrumb(
  items: BreadcrumbItem[],
  options: UseBreadcrumbOptions = {}
) {
  const {
    mobileItemCount = 2,
    enableMobileFiltering = true,
  } = options;

  const isMobile = useIsMobile();

  // Filter breadcrumb items for mobile if enabled
  const displayBreadcrumbItems = 
    enableMobileFiltering && isMobile
      ? items.slice(-mobileItemCount)
      : items;

  return {
    items: displayBreadcrumbItems,
    isMobile,
    allItems: items,
  };
}