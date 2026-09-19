import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';

@Component({
  selector: 'lib-icon-badge',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="icon-badge" [class.icon-badge-lg]="size() === 'lg'">
      <span class="icon-badge-glow"></span>
      <lib-icon [name]="icon()" [size]="size() === 'lg' ? 28 : 20" />
    </span>
  `,
  styles: [
    `
      .icon-badge {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: var(--color-surface);
        color: var(--color-primary);
        box-shadow: var(--shadow-sm);
        flex-shrink: 0;
      }

      .icon-badge-lg {
        width: 72px;
        height: 72px;
      }

      .icon-badge-glow {
        position: absolute;
        inset: -10px;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(240, 99, 42, 0.14) 0%,
          rgba(240, 99, 42, 0) 72%
        );
        z-index: -1;
      }

      .icon-badge lib-icon {
        display: flex;
        z-index: 1;
      }
    `,
  ],
})
export class IconBadge {
  readonly icon = input.required<IconName>();
  readonly size = input<'md' | 'lg'>('md');
}
