import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AppContextProvider } from "@/context/App";
import { StocksContextProvider } from "@/context/Stocks";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <AppContextProvider>
      <StocksContextProvider>
        <NextIntlClientProvider locale={locale}>
          <SidebarProvider>
            <AppSidebar />
            <main>
              <div className="p-8">{children}</div>
            </main>
          </SidebarProvider>
        </NextIntlClientProvider>
      </StocksContextProvider>
    </AppContextProvider>
  );
}
