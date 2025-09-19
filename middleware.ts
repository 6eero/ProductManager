import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // get language from the path
  const matchLocale = pathname.match(/^\/(en|it)(\/.*)?$/);

  if (matchLocale) {
    const locale = matchLocale[1];
    const rest = matchLocale[2] || "";

    // redirect to /products
    if (rest === "/" || rest === "") {
      return NextResponse.redirect(new URL(`/${locale}/products`, req.url));
    }
  }

  return intlMiddleware(req as any);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)", // esclude API, _next, file statici
};
