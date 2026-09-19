import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Service, inject, signal } from '@angular/core';
import { Lang, translations } from './translations';

const STORAGE_KEY = 'creditscope.lang';

@Service()
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly lang = signal<Lang>(this.readInitialLang());

  constructor() {
    this.applyToDocument(this.lang());
  }

  t(key: string): string {
    return translations[this.lang()][key] ?? key;
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    this.applyToDocument(lang);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* storage unavailable — ignore, language still applies for this session */
      }
    }
  }

  toggle(): void {
    this.setLang(this.lang() === 'en' ? 'fa' : 'en');
  }

  private readInitialLang(): Lang {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'fa') {
          return stored;
        }
      } catch {
        /* storage unavailable — fall through to default */
      }
    }
    return 'en';
  }

  private applyToDocument(lang: Lang): void {
    const html = this.document.documentElement;
    html.lang = lang;
    html.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }
}
