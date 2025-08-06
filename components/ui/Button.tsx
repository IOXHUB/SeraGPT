import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'btn',
  {
    variants: {
      variant: {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
        outline: 'btn-outline',
        'outline-primary': 'btn-outline-primary',
        'outline-secondary': 'btn-outline-secondary',
        ghost: 'btn-ghost',
        'ghost-primary': 'btn-ghost-primary',
        gradient: 'btn-gradient',
        dark: 'btn-dark',
        light: 'btn-light',
      },
      size: {
        sm: 'btn-sm',
        base: 'btn-base',
        lg: 'btn-lg',
        xl: 'btn-xl',
      },
      fullWidth: {
        true: 'btn-full',
        mobile: 'btn-full-mobile',
      },
      loading: {
        true: 'btn-loading',
      },
      icon: {
        true: 'btn-icon',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant,
      size,
      fullWidth,
      loading,
      icon,
      leftIcon,
      rightIcon,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? 'span' : 'button';

    return (
      <Comp
        className={`${buttonVariants({ variant, size, fullWidth, loading, icon })} ${className}`}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export default Button;
