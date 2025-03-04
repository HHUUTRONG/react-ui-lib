import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outlined';
  disabled?: boolean;
  className?: string; // For style overrides/extensions
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-my-primary hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-my-secondary hover:bg-green-700 text-white';
      case 'outlined':
        return 'border border-my-primary text-my-primary hover:bg-my-primary hover:text-white';
      default:
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
    }
  };

  const baseClasses = `py-2 px-4 rounded font-semibold ${getVariantClasses()} ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  } ${className}`; // Combine all classes

  return (
    <button className={baseClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};