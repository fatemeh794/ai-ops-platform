import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService, Icon, IconBadge } from '@frontend/ui-shared';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, IconBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly i18n = inject(I18nService);

  protected readonly features = [
    { icon: 'sparkles' as const, key: 'features.1' },
    { icon: 'shield' as const, key: 'features.2' },
    { icon: 'chart' as const, key: 'features.3' },
  ];

  protected readonly steps = [
    { icon: 'file-check' as const, key: 'steps.1' },
    { icon: 'sparkles' as const, key: 'steps.2' },
    { icon: 'check-circle' as const, key: 'steps.3' },
  ];
}
