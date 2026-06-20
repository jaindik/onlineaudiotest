import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;

  // Redirect no-trailing-slash paths to canonical trailing-slash versions
  // Only applies to paths without file extensions (HTML pages, not assets)
  if (!pathname.endsWith('/') && !pathname.includes('.')) {
    url.pathname = pathname + '/';
    return Response.redirect(url.toString(), 301);
  }

  return next();
});
