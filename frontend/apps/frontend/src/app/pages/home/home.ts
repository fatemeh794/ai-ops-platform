import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService, Icon, IconBadge, Reveal } from '@frontend/ui-shared';

type RiskLevel = 'low' | 'medium' | 'high';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, IconBadge, Reveal],
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

  // Purely decorative hero visual: three incoming applications, each
  // flowing to one of the three risk tiers the backend actually produces
  // (see rag/policies/risk-tiers.md) — drawn as an animated SVG below.
  protected readonly heroFlows: { from: number; to: RiskLevel }[] = [
    { from: 34, to: 'low' },
    { from: 118, to: 'medium' },
    { from: 202, to: 'high' },
  ];

  private static readonly HERO_DEST_Y: Record<RiskLevel, number> = {
    low: 50,
    medium: 130,
    high: 210,
  };

  protected heroDestY(level: RiskLevel): number {
    return Home.HERO_DEST_Y[level];
  }

  protected heroPath(from: number, to: RiskLevel): string {
    const destY = this.heroDestY(to);
    return `M18,${from} C150,${from} 150,${destY} 282,${destY}`;
  }
}
