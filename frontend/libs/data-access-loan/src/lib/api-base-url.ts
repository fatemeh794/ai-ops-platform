import { InjectionToken } from '@angular/core';

/**
 * Base URL for the Loan Pre-Assessment API.
 *
 * The app overrides this from its build-time environment files in
 * `app.config.ts` (see `apps/frontend/src/environments`). Libraries get a
 * sane localhost default so `LoanService` and any `httpResource` built on
 * top of it also work in isolation (e.g. unit tests) without extra setup.
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8000/api',
});
