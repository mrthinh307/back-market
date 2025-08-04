import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const Env = createEnv({
  client: {
    NEXT_PUBLIC_NEXT_BASE_URL: z.string().url(),
    NEXT_PUBLIC_DEV_FACEBOOK_URL: z.string().url(),
    NEXT_PUBLIC_AUTHORITATIVE_ROLE: z.string().default('admin'),
  },
  shared: {
    NODE_ENV: z.enum(['test', 'development', 'production']).optional(),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_NEXT_BASE_URL: process.env.NEXT_PUBLIC_NEXT_BASE_URL,
    NEXT_PUBLIC_DEV_FACEBOOK_URL: process.env.NEXT_PUBLIC_DEV_FACEBOOK_URL,
    NEXT_PUBLIC_AUTHORITATIVE_ROLE: process.env.NEXT_PUBLIC_AUTHORATIVE_ROLE,
  },
});
