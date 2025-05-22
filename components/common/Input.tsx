
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string; 
}

export const Input: React.FC<InputProps> = ({ label, name, className, error, ...props }) => {
  const baseInputClasses = "w-full px-4 py-2.5 border border-border-color rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors duration-150 bg-input-bg text-text-header placeholder-text-muted"; // Updated text to text-header, added placeholder color
  const errorInputClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";
  
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-text-body mb-1.5"> 
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        className={`${baseInputClasses} ${error ? errorInputClasses : ''} ${className || ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};