import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Adds the `reveal` class immediately (see styles.scss: opacity 0 + a
 * slight translateY) and flips on `is-visible` the first time the host
 * element scrolls into view, via IntersectionObserver. SSR-safe — on the
 * server (or if IntersectionObserver isn't available) it just marks the
 * element visible right away instead of leaving it permanently hidden.
 *
 * Usage: <div class="card" libReveal> ... </div>
 */
@Directive({
  selector: '[libReveal]',
  host: { class: 'reveal' },
})
export class Reveal {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;

      if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
        node.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('is-visible');
              observer.unobserve(node);
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      );

      observer.observe(node);
    });
  }
}
