import { z } from 'zod';
import { environment } from '@env/environment';

export const envSchema = z.object({
  production: z.boolean(),
  apiBaseUrl: z.string().url(),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const ENV: EnvConfig = envSchema.parse(environment);
