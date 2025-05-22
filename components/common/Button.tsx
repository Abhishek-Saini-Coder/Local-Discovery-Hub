
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'ghost' | 'accent' | 'custom'; // Added 'accent'
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const baseStyle = "font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-95";
  
  let variantStyle = '';
  switch(variant) {
    case 'primary':
      variantStyle = 'bg-brand-primary text-white hover:bg-brand-primary-hover focus:ring-brand-primary';
      break;
    case 'secondary':
      variantStyle = 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400 border border-slate-300';
      break;
    case 'accent': // Added accent variant
      variantStyle = 'bg-brand-accent text-white hover:bg-brand-accent-hover focus:ring-brand-accent';
      break;
    case 'danger':
      variantStyle = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'warning': // Amber color for warning, distinct from accent.
      variantStyle = 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500';
      break;
    case 'ghost':
      variantStyle = 'bg-transparent text-brand-primary hover:bg-brand-primary hover:bg-opacity-10 focus:ring-brand-primary';
      break;
    case 'custom':
      // Use className prop for full custom styling
      break;
  }

  let sizeStyle = '';
  switch(size) {
    case 'sm':
      sizeStyle = 'py-1.5 px-3 text-sm';
      break;
    case 'md':
      sizeStyle = 'py-2.5 px-5 text-base';
      break;
    case 'lg':
      sizeStyle = 'py-3 px-6 text-lg';
      break;
  }


  return (
    <button
      className={`${baseStyle} ${sizeStyle} ${variant === 'custom' ? '' : variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
