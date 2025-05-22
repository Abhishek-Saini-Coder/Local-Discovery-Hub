
import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: SelectOption[];
  error?: string; 
  placeholder?: string; 
}

export const Select: React.FC<SelectProps> = ({ label, name, options, className, error, ...props }) => {
  const baseSelectClasses = "w-full pl-4 pr-10 py-2.5 border border-border-color bg-input-bg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary appearance-none transition-colors duration-150 text-text-header"; // Updated text to text-header
  const errorSelectClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-text-body mb-1.5"> 
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          className={`${baseSelectClasses} ${error ? errorSelectClasses : ''} ${className || ''} ${props.value === "" && props.placeholder ? 'text-text-muted' : 'text-text-header'}`} // Dynamically set text color for placeholder
          {...props}
        >
          {props.placeholder && <option value="" disabled>{props.placeholder}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-muted"> 
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};