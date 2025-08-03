import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(255, 'Password is too long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one digit (0-9)'),
});

export const nameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
});
