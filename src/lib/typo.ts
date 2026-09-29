/**
 * Typographie française sur le HTML final : espace insécable avant « : ; ? ! »,
 * et à l'intérieur des guillemets « ». Seul le texte hors balises est modifié ;
 * le contenu de <script>, <style>, <textarea> et <pre> est laissé intact.
 */
const NBSP = ' ';
const NNBSP = ' ';
const SKIP = /^<(script|style|textarea|pre)\b/i;
const SKIP_END = /^<\/(script|style|textarea|pre)\b/i;

export function typoTexte(t: string): string {
  return t
    .replace(/[ \t\n\r]+([;?!])/g, `${NNBSP}$1`)
    .replace(/[ \t\n\r]+:(?=[\s<]|$)/g, `${NBSP}:`)
    .replace(/«[ \t\n\r]+/g, `«${NBSP}`)
    .replace(/[ \t\n\r]+»/g, `${NBSP}»`);
}

export function typoHtml(html: string): string {
  let skip = false;
  return html
    .split(/(<[^>]*>)/)
    .map((part) => {
      if (part.startsWith('<')) {
        if (SKIP.test(part)) skip = true;
        else if (SKIP_END.test(part)) skip = false;
        return part;
      }
      return skip ? part : typoTexte(part);
    })
    .join('');
}
