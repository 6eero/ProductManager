import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AppContextProvider } from "@/context/App";
import { StocksContextProvider } from "@/context/Stocks";

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
          {children}
        </NextIntlClientProvider>
      </StocksContextProvider>
    </AppContextProvider>
  );
}
