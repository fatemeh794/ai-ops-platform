import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // the dashboard reads a dynamic :id and calls the live backend API,
  // so it must be rendered per-request rather than prerendered at build time
  {
    path: 'applications/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
