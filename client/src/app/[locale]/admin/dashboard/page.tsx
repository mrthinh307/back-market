'use client';

import { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useRouterRedirect } from '@/hooks/useRouterRedirect';
import LoadingPage from '@/components/LoadingPage';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/app-sidebar';
import { SiteHeader } from '@/components/admin/site-header';
import { SectionCards } from '@/components/admin/section-cards';
import { ChartAreaInteractive } from '@/components/admin/chart-area-interactive';
import { DataTable } from '@/components/admin/data-table';

import data from "./data.json"

export default function AdminDashboard() {
  const { accessToken, isLoading, getMe } = useAuth();
  const { redirectToLogin, redirectToHome } = useRouterRedirect();

  const [isAdmin, setIsAdmin] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        if (!hasRedirected) {
          setHasRedirected(true);
          redirectToLogin();
        }
        return;
      }

      const userData = await getMe();

      if (!userData || userData.role !== 'ADMIN') {
        if (!hasRedirected) {
          setHasRedirected(true);
          redirectToHome();
        }
        return;
      }

      setIsAdmin(true);
    };

    if (!isLoading && !isAdmin && !hasRedirected) {
      checkAuth();
    }
  }, [accessToken, isLoading, isAdmin, hasRedirected]);

  if (isLoading || !isAdmin) {
    return <LoadingPage />;
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
