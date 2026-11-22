import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { cn } from '../utils/cn';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="buttonClasses()"
      (click)="clicked.emit($event)"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'outline' | 'danger'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly customClass = input<string>('');

  readonly clicked = output<MouseEvent>();

  protected readonly buttonClasses = computed(() => {
    const base =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md cursor-pointer';
    const variants: Record<string, string> = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    };
    const sizes: Record<string, string> = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return cn(base, variants[this.variant()], sizes[this.size()], this.customClass());
  });
}
