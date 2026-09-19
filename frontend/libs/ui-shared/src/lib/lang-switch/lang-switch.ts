import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n';
import { Icon } from '../icon/icon';

@Component({
  selector: 'lib-lang-switch',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="lang-switch" (click)="i18n.toggle()">
      <lib-icon name="globe" [size]="16" />
      <span>{{ i18n.t('nav.lang') }}</span>
    </button>
  `,
  styles: [
    `
      .lang-switch {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border: 1.5px solid var(--color-border);
        background: transparent;
        color: var(--color-ink);
        border-radius: var(--radius-pill);
        padding: 8px 14px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: border-color 0.15s ease;
      }

      .lang-switch:hover {
        border-color: var(--color-ink);
      }
    `,
  ],
})
export class LangSwitch {
  protected readonly i18n = inject(I18nService);
}
