import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button.jsx';
import useResetPassword from './useResetPassword.js';

function ResetPassword() {
  const { isResetPassword, error, resetUserPassword, updatedData } = useResetPassword();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  function submit(passwords) {
    resetUserPassword(passwords);
    reset();
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
  };

  const inputStyles = `w-full rounded-2xl border border-stone-700/50 bg-[#1b2127]/80 px-6 py-4 text-white placeholder:text-stone-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50 hover:border-stone-600`;

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col gap-8 overflow-hidden"
      onSubmit={handleSubmit(submit)}
    >
      {/* Decorative background elements */}
      <div className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-blue-600/5 blur-[80px]" />

      <header className="space-y-3">
        <h2 className="text-3xl font-black tracking-tight text-white">
          Reset Password<span className="text-blue-500">.</span>
        </h2>
        <p className="text-lg text-stone-400 leading-relaxed">
          Almost there! Enter the 6-digit code we sent you and set your new password.
        </p>
      </header>

      <div className="space-y-6">
        <motion.div variants={itemVariants} className="space-y-3">
          <label htmlFor="resetCode" className="flex items-center gap-2 text-sm font-bold text-stone-400 uppercase tracking-widest">
            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 003.112 11c0-5.523 4.477-10 10-10s10 4.477 10 10a10.003 10.003 0 01-2.212 6.44l-.054.09m-3.44 2.04C15.009 17.799 14 14.517 14 11" />
            </svg>
            Reset Code
          </label>
          <input
            disabled={isResetPassword}
            id="resetCode"
            type="text"
            placeholder="6-digit verification code"
            className={inputStyles}
            {...register('resetCode', {
              required: 'Reset Code is required',
            })}
          />
          {errors?.resetCode && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm font-medium text-red-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.resetCode.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <label htmlFor="password" className="flex items-center gap-2 text-sm font-bold text-stone-400 uppercase tracking-widest">
            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            New Password
          </label>
          <input
            disabled={isResetPassword}
            id="password"
            type="password"
            placeholder="Min. 8 characters"
            className={inputStyles}
            {...register('password', {
              required: 'New Password is required',
              minLength: { value: 8, message: 'Minimum length is 8 characters' },
            })}
          />
          {errors?.password && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm font-medium text-red-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.password.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-bold text-stone-400 uppercase tracking-widest">
            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Confirm Password
          </label>
          <input
            disabled={isResetPassword}
            id="confirmPassword"
            type="password"
            placeholder="Repeat your new password"
            className={inputStyles}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === getValues().password || 'Passwords must match',
            })}
          />
          {errors?.confirmPassword && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm font-medium text-red-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mt-2 space-y-6">
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-sm font-medium text-red-400 backdrop-blur-sm"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error?.message || "Something went wrong. Please try again."}
          </motion.div>
        )}

        {updatedData && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-4 text-sm font-bold text-green-400 backdrop-blur-sm"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            Password reset successfully! Redirecting...
          </motion.div>
        )}
        
        <Button
          disabled={isResetPassword}
          className="group relative w-full overflow-hidden !rounded-2xl !py-4 !px-8 !font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
            {isResetPassword ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Resetting Password...
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </span>
        </Button>
      </motion.div>
    </motion.form>
  );
}

export default ResetPassword;
