import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'arrow-right'
  | 'file-check'
  | 'shield'
  | 'chart'
  | 'sparkles'
  | 'check-circle'
  | 'globe'
  | 'plus'
  | 'trash'
  | 'refresh';

@Component({
  selector: 'lib-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      class="icon"
      [class.icon-directional]="name() === 'arrow-right'"
      aria-hidden="true"
    >
      @switch (name()) {
        @case ('arrow-right') {
          <path
            d="M4 12h16M14 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        }
        @case ('file-check') {
          <path
            d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
          <path
            d="M9.25 13.25 11 15l3.75-4.25"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        }
        @case ('shield') {
          <path
            d="M12 3.5 5 6v5.2c0 4.6 3 8 7 9.3 4-1.3 7-4.7 7-9.3V6l-7-2.5Z"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
          <path
            d="M9 12.2l2.1 2.1L15.3 10"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        }
        @case ('chart') {
          <path
            d="M4 20V4M4 20h16"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M8 16v-4M12.5 16V8M17 16v-6.5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        }
        @case ('sparkles') {
          <path
            d="M12 3.5l1.6 4.3 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6L12 3.5Z"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linejoin="round"
          />
          <path
            d="M19 15l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7L19 15Z"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linejoin="round"
          />
        }
        @case ('check-circle') {
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8" />
          <path
            d="M8.5 12.2l2.3 2.3 4.7-5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8" />
          <path
            d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z"
            stroke="currentColor"
            stroke-width="1.6"
          />
        }
        @case ('plus') {
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        }
        @case ('trash') {
          <path
            d="M5 7h14M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2M7 7l1 12.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1L17 7"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        }
        @case ('refresh') {
          <path
            d="M4.5 12a7.5 7.5 0 0 1 12.6-5.5M19.5 12a7.5 7.5 0 0 1-12.6 5.5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M17 4.5V8h-3.5M7 19.5V16h3.5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<number>(20);
}
