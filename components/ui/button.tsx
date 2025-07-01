import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantClasses = {
  default: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'bg-white text-primary border border-primary hover:bg-primary hover:text-white group',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className = '', children, size = 'md', variant = 'default', ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md font-semibold shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    {...props}
  >
    <span className="group-hover:text-white transition-colors w-full h-full flex items-center justify-center">{children}</span>
  </button>
));

Button.displayName = 'Button';

export default Button; 