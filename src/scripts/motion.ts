/**
 * Apparitions au défilement, script unique du site (importé par BaseLayout).
 * - Blocs de contenu (.section__head, .grid > *, .split > *) : classe .reveal puis .is-visible.
 * - [data-motion="scroll"] : tracé lié au défilement en CSS pur si animation-timeline: view() existe,
 *   sinon joué une fois à l'entrée dans l'écran (.is-armed puis .is-visible).
 * - [data-motion="time"] : tracé joué une fois à l'entrée dans l'écran.
 * - [data-motion="loop"] : petite boucle (vapeur, étoiles) active seulement quand l'élément est visible.
 * Sans JS, sans IntersectionObserver ou en mouvement réduit : rien n'est armé, l'état final reste affiché.
 * Les éléments déjà visibles au chargement ne sont jamais masqués (pas de flash).
 */
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const scrollDriven = CSS.supports('animation-timeline: view()');
  const once = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-visible'); once.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  const loop = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.classList.toggle('is-playing', e.isIntersecting);
  });
  const below = (el: Element) => el.getBoundingClientRect().top >= innerHeight;

  document.querySelectorAll<HTMLElement>('main .section__head, main .grid > *, main .split > *, main .trust-bar, main .avis-section, main .panel, main .mosaic > *').forEach((el) => {
    if (!below(el)) return;
    const i = Array.prototype.indexOf.call(el.parentElement?.children ?? [], el);
    el.style.setProperty('--reveal-delay', `${Math.min(i, 4) * 90}ms`);
    el.classList.add('reveal');
    once.observe(el);
  });

  document.querySelectorAll<HTMLElement>('[data-motion]').forEach((el) => {
    const mode = el.dataset.motion;
    if (mode === 'loop') return loop.observe(el);
    if ((mode === 'scroll' && scrollDriven) || !below(el)) return;
    el.classList.add('is-armed');
    once.observe(el);
  });
}
