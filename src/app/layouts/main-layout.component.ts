import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex min-h-screen flex-col bg-gray-50">
      <header class="border-b border-gray-200 bg-white">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-3">
            <span class="text-lg font-bold tracking-tight text-gray-900">Angular Template</span>
            <span class="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
              Production
            </span>
          </div>
          <nav class="flex gap-4 text-sm font-medium">
            <a routerLink="/" class="text-gray-600 transition hover:text-gray-900">Home</a>
            <a routerLink="/example" class="text-gray-600 transition hover:text-gray-900"
              >Features</a
            >
          </nav>
        </div>
      </header>

      <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <router-outlet />
      </main>

      <footer class="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
        Angular Production-Ready Template &copy; 2026
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
