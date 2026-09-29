import { defineMiddleware } from 'astro:middleware';
import { typoHtml } from './lib/typo';

/** Applique la typographie française à toutes les pages HTML (pré-rendues au build, ou rendues à la demande). */
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(typoHtml(await response.text()), { status: response.status, statusText: response.statusText, headers });
});
