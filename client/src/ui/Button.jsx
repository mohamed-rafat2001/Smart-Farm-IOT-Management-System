import React from 'react';

const Button = ({
  children,
  className = '',
  color,
  $backgroundcolor,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  // Base button classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  // Size variants
  const sizeClasses = {
    small: 'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm',
    medium: 'px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base',
    large: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
    xlarge: 'px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl',
  };

  // Variant classes
  const variantClasses = {
    primary: `
      bg-blue-600 text-white hover:bg-blue-700 
      focus:ring-blue-500 shadow-md hover:shadow-lg
      active:bg-blue-800
    `,
    secondary: `
      bg-gray-600 text-white hover:bg-gray-700 
      focus:ring-gray-500 shadow-md hover:shadow-lg
      active:bg-gray-800
    `,
    success: `
      bg-green-600 text-white hover:bg-green-700 
      focus:ring-green-500 shadow-md hover:shadow-lg
      active:bg-green-800
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-700 
      focus:ring-red-500 shadow-md hover:shadow-lg
      active:bg-red-800
    `,
    warning: `
      bg-yellow-600 text-white hover:bg-yellow-700 
      focus:ring-yellow-500 shadow-md hover:shadow-lg
      active:bg-yellow-800
    `,
    outline: `
      border-2 border-gray-300 bg-transparent text-gray-700 
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-400 focus:bg-gray-50
      active:bg-gray-100
    `,
    ghost: `
      bg-transparent text-gray-700 hover:bg-gray-100 
      focus:ring-gray-400 focus:bg-gray-100
      active:bg-gray-200
    `,
  };

  // Custom color support (for backward compatibility)
  const customColorClasses = color ? `text-[${color}]` : '';
  const customBgClasses = $backgroundcolor ? `bg-[${$backgroundcolor}]` : '';

  // Combine all classes
  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${customColorClasses}
    ${customBgClasses}
    ${className}
  `
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
