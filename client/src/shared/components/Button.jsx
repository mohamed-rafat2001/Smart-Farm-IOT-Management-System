import { motion } from 'framer-motion';

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  whileHover,
  whileTap,
  ...props
}) => {
  // Base button classes
  const baseClasses = `
    inline-flex items-center justify-center font-black tracking-widest uppercase
    transition-all duration-500 ease-out
    focus:outline-none focus:ring-4 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  // Size variants
  const sizeClasses = {
    small: 'px-4 py-2 text-[10px] rounded-xl',
    medium: 'px-8 py-4 text-xs rounded-2xl',
    large: 'px-10 py-5 text-sm rounded-[1.5rem]',
    xlarge: 'px-12 py-6 text-base rounded-[2rem]',
  };

  // Variant classes
  const variantClasses = {
    primary: `
      bg-blue-600 text-white hover:bg-blue-500 
      focus:ring-blue-500/20 shadow-xl shadow-blue-900/20
      hover:shadow-blue-500/30
    `,
    secondary: `
      bg-[#283039]/50 text-stone-300 hover:bg-[#283039] hover:text-white
      focus:ring-stone-500/20 shadow-xl border border-stone-800/50
    `,
    success: `
      bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white
      focus:ring-green-500/20 shadow-xl shadow-green-900/10
    `,
    danger: `
      bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white
      focus:ring-red-500/20 shadow-xl shadow-red-900/10
    `,
    warning: `
      bg-orange-600/10 text-orange-500 hover:bg-orange-600 hover:text-white
      focus:ring-orange-500/20 shadow-xl shadow-orange-900/10
    `,
    outline: `
      border-2 border-stone-800 bg-transparent text-stone-400 
      hover:border-stone-700 hover:text-white hover:bg-stone-800/30
      focus:ring-stone-500/10
    `,
    ghost: `
      bg-transparent text-stone-400 hover:bg-stone-800/40 hover:text-white
      focus:ring-stone-500/10
    `,
  };

  // Combine all classes
  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <motion.button
      whileHover={whileHover || { scale: 1.02, y: -2 }}
      whileTap={whileTap || { scale: 0.98 }}
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
