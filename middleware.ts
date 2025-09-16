import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Middleware di next-intl
const intlMiddleware = createMiddleware(routing);

export default function middleware(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Estraggo la lingua dalla prima parte della path
  const matchLocale = pathname.match(/^\/(en|it)(\/.*)?$/);

  if (matchLocale) {
    const locale = matchLocale[1];
    const rest = matchLocale[2] || "";

    // Se l'utente va su /it/ o /en/ (senza path), redirect a /{locale}/stocks
    if (rest === "/" || rest === "") {
      return NextResponse.redirect(new URL(`/${locale}/stocks`, req.url));
    }
  }

  // Altrimenti delega a next-intl
  return intlMiddleware(req as any);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)", // esclude API, _next, file statici
};
