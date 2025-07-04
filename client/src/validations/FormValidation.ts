import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
});

export type EmailFormData = z.infer<typeof emailSchema>;
