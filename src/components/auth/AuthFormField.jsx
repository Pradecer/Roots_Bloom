import React from 'react';

export const AuthFormField = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  leadingIcon: LeadingIcon,
  children,
  autoFocus = false,
  className = ''
}) => {
  return (
    <div className={`auth-field-group mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-accent-clay">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {LeadingIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
            <LeadingIcon size={16} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          className={`w-full py-2.5 sm:py-3 text-sm text-ink bg-paper-warm border rounded-xl transition-all outline-none ${
            LeadingIcon ? 'pl-10' : 'pl-3.5'
          } ${children ? 'pr-11' : 'pr-3.5'} ${
            error 
              ? 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-1 focus:ring-red-400' 
              : 'border-rule focus:bg-white focus:border-brand-forest focus:ring-1 focus:ring-brand-forest/20'
          }`}
        />
        {children}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

