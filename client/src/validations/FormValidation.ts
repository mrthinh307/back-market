/* eslint-disable no-misleading-character-class */
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

export const deliveryAddressSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name is too long')
    .regex(/^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F]+$/, 'Full name can only contain letters and spaces'),
  
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^(\+\d{1,4}[\s.-]?)?\d{6,15}$/, 'Please enter a valid phone number'),
  
  city: z
    .string()
    .min(1, 'City is required')
    .max(50, 'City name is too long')
    .regex(/^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F\-]+$/, 'City name can only contain letters, spaces and hyphens'),
  
  district: z
    .string()
    .min(1, 'District is required')
    .max(50, 'District name is too long')
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F\-]+$/, 'District name can only contain letters, numbers, spaces and hyphens'),
  
  ward: z
    .string()
    .min(1, 'Ward is required')
    .max(50, 'Ward name is too long')
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F\-]+$/, 'Ward name can only contain letters, numbers, spaces and hyphens'),
  
  addressLine: z
    .string()
    .min(1, 'Address line is required')
    .max(200, 'Address line is too long')
    .min(10, 'Address line must be at least 10 characters long'),
});
