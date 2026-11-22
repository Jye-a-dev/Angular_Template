import { z } from 'zod';

export const exampleItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  completed: z.boolean().default(false),
});

export type ExampleItem = z.infer<typeof exampleItemSchema>;
