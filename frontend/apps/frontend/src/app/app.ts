import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { I18nService, LangSwitch } from '@frontend/ui-shared';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, LangSwitch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly i18n = inject(I18nService);
}
