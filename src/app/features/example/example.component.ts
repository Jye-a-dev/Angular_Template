import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ExampleService } from './services/example.service';
import { ExampleCardComponent } from './components/example-card.component';
import { ButtonComponent } from '@/shared/components/button.component';

@Component({
  selector: 'app-example',
  imports: [ExampleCardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <div class="border-b border-gray-200 pb-5">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Architecture Showcase</h1>
        <p class="mt-2 text-sm text-gray-600">
          Demonstrating Standalone Components, Signal-based reactivity, and Tailwind CSS v4.
        </p>
      </div>

      <div class="flex items-center justify-between rounded-lg bg-blue-50 p-4">
        <div>
          <span class="text-sm font-medium text-blue-900">Completed Deliverables</span>
          <p class="text-2xl font-bold text-blue-700">
            {{ exampleService.completedCount() }} / {{ exampleService.totalCount() }}
          </p>
        </div>
        <div class="text-right">
          <span
            class="inline-flex items-center rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-800"
          >
            Zoneless Enabled
          </span>
        </div>
      </div>

      <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 class="text-sm font-medium text-gray-900">Add Architectural Task</h2>
        <div class="mt-3 flex gap-3">
          <input
            #titleInput
            type="text"
            placeholder="Feature title..."
            class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            [value]="titleText()"
            (input)="titleText.set(titleInput.value)"
          />
          <app-button variant="primary" size="md" (clicked)="onAdd(titleInput)">
            Add Task
          </app-button>
        </div>
      </div>

      <div class="space-y-3">
        @for (item of exampleService.items(); track item.id) {
          <app-example-card [item]="item" (itemToggled)="exampleService.toggleItem($event)" />
        } @empty {
          <div
            class="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500"
          >
            No items present in state.
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  protected readonly exampleService = inject(ExampleService);
  protected readonly titleText = signal('');

  protected onAdd(inputEl: HTMLInputElement): void {
    const val = this.titleText().trim();
    if (!val) return;
    this.exampleService.addItem(val, 'Custom feature deliverable created via signals state');
    this.titleText.set('');
    inputEl.value = '';
  }
}
