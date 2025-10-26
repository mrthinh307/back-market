import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/libs/utils';

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-sm text-base font-semibold transition-all disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer overflow-hidden`,
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-button-hover disabled:bg-[#0e10160d] dark:disabled:bg-[#3a3a3a] disabled:text-[#8e9095]',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 disabled:opacity-50',
        outline:
          'border border-dark text-foreground bg-white shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 disabled:opacity-50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 disabled:opacity-50',
        ghost:
          'text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 disabled:opacity-50',
        link: 'text-foreground underline-offset-4 hover:underline disabled:opacity-50',
      },
      size: {
        default: 'h-12 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-sm px-6 has-[>svg]:px-4',
        icon: 'size-10 rounded-full p-2 shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
