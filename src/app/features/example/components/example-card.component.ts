import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ExampleItem } from '../models/example.model';
import { ButtonComponent } from '@/shared/components/button.component';

@Component({
  selector: 'app-example-card',
  imports: [ButtonComponent],
  template: `
    <div
      class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3
            class="text-base font-semibold text-gray-900"
            [class.line-through]="item().completed"
            [class.text-gray-400]="item().completed"
          >
            {{ item().title }}
          </h3>
          <p class="mt-1 text-sm text-gray-600">{{ item().description }}</p>
        </div>
        <app-button
          [variant]="item().completed ? 'secondary' : 'primary'"
          size="sm"
          (clicked)="itemToggled.emit(item().id)"
        >
          @if (item().completed) {
            Undo
          } @else {
            Done
          }
        </app-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleCardComponent {
  readonly item = input.required<ExampleItem>();
  readonly itemToggled = output<string>();
}
