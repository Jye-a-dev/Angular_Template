import { ExampleItem } from '../schemas/example.schema';

export type { ExampleItem };

export interface ExampleState {
  items: ExampleItem[];
  isLoading: boolean;
  error: string | null;
}
