import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva(
  '',
  {
    variants: {
      variant: {
        body: 'text-body',
        lead: 'text-lead',
        small: 'text-small',
        caption: 'text-caption',
        'user-panel': 'user-panel-text',
        'user-panel-caption': 'user-panel-caption',
      },
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        tertiary: 'text-tertiary',
        muted: 'text-muted',
        brand: 'text-brand',
        'brand-secondary': 'text-brand-secondary',
        'brand-accent': 'text-brand-accent',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      variant: 'body',
      color: 'secondary',
      weight: 'normal',
      align: 'left',
    },
  }
);

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: keyof JSX.IntrinsicElements;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className = '', variant, color, weight, align, as: Comp = 'p', children, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={`${textVariants({ variant, color, weight, align })} ${className}`}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Text.displayName = 'Text';

export default Text;
