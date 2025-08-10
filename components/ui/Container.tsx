import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const containerVariants = cva(
  'container',
  {
    variants: {
      size: {
        xs: 'container-xs',
        sm: 'container-sm',
        md: 'container-md',
        lg: 'container-lg',
        xl: 'container-xl',
        '2xl': 'container-2xl',
        text: 'container-text',
        body: 'container-body',
        visual: 'container-visual',
        page: 'container-page',
      },
      spacing: {
        none: '',
        sm: 'page-spacing-sm',
        md: 'page-spacing-md',
        lg: 'page-spacing-lg',
        xl: 'page-spacing-xl',
      },
    },
    defaultVariants: {
      size: 'body',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: 'div' | 'section' | 'main' | 'article' | 'aside' | 'header' | 'footer';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = '', size, spacing, as: Comp = 'div', children, ...props }, ref) => {
    const Component = Comp as React.ElementType;
    return (
      <Component
        ref={ref}
        className={`${containerVariants({ size, spacing })} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export default Container;
