import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { AuthFormField } from './AuthFormField';

export const PasswordInput = ({
  id = 'password',
  label = 'Password',
  placeholder = '••••••••',
  value,
  onChange,
  error,
  required = true
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthFormField
      id={id}
      label={label}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
      leadingIcon={Lock}
    >
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-ink transition-colors focus:outline-none"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </AuthFormField>
  );
};

