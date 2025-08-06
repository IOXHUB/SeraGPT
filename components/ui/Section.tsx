import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const sectionVariants = cva(
  '',
  {
    variants: {
      spacing: {
        none: '',
        sm: 'section-sm',
        md: 'section-md',
        lg: 'section-lg',
        xl: 'section-xl',
        component: 'component-spacing',
        'component-sm': 'component-spacing-sm',
        'component-lg': 'component-spacing-lg',
        'user-panel': 'user-panel-section',
      },
      background: {
        none: '',
        primary: 'bg-white',
        secondary: 'bg-gray-50',
        tertiary: 'bg-gray-100',
      },
      padding: {
        none: '',
        sm: 'page-spacing-sm',
        md: 'page-spacing-md',
        lg: 'page-spacing-lg',
        xl: 'page-spacing-xl',
      },
    },
    defaultVariants: {
      spacing: 'md',
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: keyof JSX.IntrinsicElements;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className = '', spacing, background, padding, as: Comp = 'section', children, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={`${sectionVariants({ spacing, background, padding })} ${className}`}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Section.displayName = 'Section';

export default Section;
