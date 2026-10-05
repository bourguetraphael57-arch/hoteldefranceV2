/**
 * Couche « cinéma » : GSAP + ScrollTrigger + Lenis, chargée à la demande par BaseLayout (jamais en mouvement réduit).
 * Elle s'ajoute à src/scripts/motion.ts : les blocs qu'elle prend en charge perdent leur classe .reveal.
 * Sans JS, ou si ce module échoue, le site reste complet (l'état final est l'état par défaut ; .cin est retirée).
 * Les effets lourds (Lenis, parallaxe) ne tournent que sur grand écran avec souris ; le mobile garde les apparitions simples.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

declare global { interface Window { __cin?: number } }

const root = document.documentElement;
const below = (el: Element) => el.getBoundingClientRect().top >= innerHeight;
const $$ = <T extends HTMLElement = HTMLElement>(sel: string) => [...document.querySelectorAll<T>(sel)];

gsap.registerPlugin(ScrollTrigger, SplitText);
clearTimeout(window.__cin);

/** Retire le fondu CSS de motion.ts et renvoie les éléments encore sous la ligne de flottaison. */
const take = (els: HTMLElement[]) => els.filter((el) => {
  if (!below(el)) return false;
  el.classList.remove('reveal', 'is-visible');
  el.style.removeProperty('--reveal-delay');
  return true;
});

const mm = gsap.matchMedia();

// Apparitions en cascade (toutes tailles) ---------------------------------------------------------------------
mm.add('(min-width: 0px)', () => {
  const groups = [
    'main .rail > *', 'main .services-grid > *', 'main .counters-grid > *', 'main .checklist li',
    'main .room-gallery__thumbs li', 'main .facts--lg > *',
  ];
  for (const sel of groups) {
    const items = take($$(sel));
    if (!items.length) continue;
    gsap.set(items, { opacity: 0, y: 48 });
    ScrollTrigger.batch(items, {
      start: 'top 88%', once: true,
      onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity' }),
    });
  }

  // Titres de section : lignes masquées qui montent.
  for (const h of take($$('main .section__head h2'))) {
    h.classList.add('is-split');
    SplitText.create(h, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 110, duration: 1.1, stagger: 0.12, ease: 'power4.out',
        scrollTrigger: { trigger: h, start: 'top 88%', once: true },
      }),
    });
  }

  // Tracé SVG de la carte des environs, puis points d'intérêt qui « pop ».
  const carte = document.querySelector<SVGElement>('[data-carte]');
  if (carte && below(carte)) {
    const traits = carte.querySelectorAll<SVGPathElement>('.carte__trait');
    const pops = carte.querySelectorAll('.carte__poi');
    gsap.set(traits, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(pops, { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
    gsap.timeline({ scrollTrigger: { trigger: carte, start: 'top 75%', once: true } })
      .to(traits, { strokeDashoffset: 0, duration: 1.8, stagger: 0.25, ease: 'power2.inOut' })
      .to(pops, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }, '-=0.9');
  }
});

// Grand écran, souris : scroll fluide, parallaxe, header intelligent, activités en alternance ----------------------
mm.add('(min-width: 64rem) and (hover: hover) and (pointer: fine)', () => {
  const lenis = new Lenis({ anchors: true, prevent: (n) => !!n.closest('dialog') });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const hero = document.querySelector<HTMLElement>('.hero');
  if (hero) {
    const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero__bg img', { y: () => hero.offsetHeight * 0.2, ease: 'none', scrollTrigger: scrub });
    gsap.to('.hero__sky', { yPercent: 35, ease: 'none', scrollTrigger: scrub });
    gsap.to('.hero__text', { yPercent: -12, opacity: 0.2, ease: 'none', scrollTrigger: scrub });
    gsap.to('.hero__relief-back', { y: -14, ease: 'none', scrollTrigger: scrub });
  }

  // Header : se range en descendant, revient en remontant (jamais pendant la navigation au clavier ou le menu).
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (header) {
    ScrollTrigger.create({
      start: 300,
      onUpdate: (self) => {
        const hide = self.direction === 1 && !header.matches(':focus-within');
        gsap.to(header, { yPercent: hide ? -110 : 0, duration: 0.45, ease: 'power3.out', overwrite: true });
      },
      onLeaveBack: () => { gsap.to(header, { yPercent: 0, duration: 0.3, overwrite: true }); },
    });
  }

  // Activités / sites : entrée latérale alternée.
  $$('main .sites > li').forEach((li, i) => {
    if (!below(li)) return;
    li.classList.remove('reveal', 'is-visible');
    gsap.from(li, {
      x: i % 2 ? 70 : -70, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: li, start: 'top 90%', once: true },
    });
  });

  return () => { gsap.ticker.remove(tick); lenis.destroy(); };
});

// Hero : intro cinématique (toutes tailles) ----------------------------------------------------------------------
const heroText = document.querySelector<HTMLElement>('.hero__text');
if (heroText) {
  const title = heroText.querySelector<HTMLElement>('.hero__title');
  const rest = [...heroText.children].filter((c) => c !== title);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { root.classList.remove('cin'); gsap.set(heroText.children, { clearProps: 'all' }); } });
  gsap.set(heroText.children, { opacity: 1 });
  tl.fromTo('.hero__bg img', { scale: 1.14 }, { scale: 1, duration: 2.6, ease: 'power2.out' }, 0)
    .from('[data-header]', { yPercent: -100, opacity: 0, duration: 0.9 }, 0.2);
  if (title) {
    const split = SplitText.create(title, { type: 'lines', mask: 'lines' });
    tl.from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.14, ease: 'power4.out' }, 0.35);
  }
  tl.from(rest, { y: 28, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.55)
    .from('.hero__relief-line, .hero__river', { opacity: 0, duration: 1.2 }, 0.9);
} else {
  root.classList.remove('cin');
}

// Galeries : rideau (clip-path) à chaque changement de photo dans les visionneuses ------------------------------
for (const img of $$<HTMLImageElement>('dialog.lightbox .lightbox__figure img')) {
  new MutationObserver(() => {
    gsap.fromTo(img, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clipPath' });
  }).observe(img, { attributes: true, attributeFilter: ['src'] });
}

window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
