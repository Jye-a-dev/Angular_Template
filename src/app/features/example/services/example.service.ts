import { Injectable, signal, computed } from '@angular/core';
import { ExampleItem } from '../models/example.model';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  private readonly _items = signal<ExampleItem[]>([
    {
      id: '1',
      title: 'Modular Architecture',
      description: 'Feature-based module structure with strict boundaries',
      completed: true,
    },
    {
      id: '2',
      title: 'Signals State & Zoneless',
      description: 'Zero zone.js overhead with pure signal reactivity',
      completed: true,
    },
    {
      id: '3',
      title: 'Tailwind CSS v4 Engine',
      description: 'Next-gen CSS-first utility configuration with @tailwindcss/postcss',
      completed: true,
    },
  ]);

  readonly items = this._items.asReadonly();
  readonly completedCount = computed(() => this._items().filter((i) => i.completed).length);
  readonly totalCount = computed(() => this._items().length);

  toggleItem(id: string): void {
    this._items.update((items) =>
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  addItem(title: string, description: string): void {
    const newItem: ExampleItem = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
    };
    this._items.update((items) => [...items, newItem]);
  }
}
