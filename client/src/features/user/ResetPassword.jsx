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
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const inputStyles = `w-full rounded-xl border border-stone-700/50 bg-[#283039]/30 p-3 text-stone-200 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 hover:border-stone-600`;

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(submit)}
    >
      <header>
        <h2 className="text-xl font-bold text-white">Reset Password</h2>
        <p className="mt-2 text-sm text-stone-400">
          Enter the code sent to your email and choose a new password.
        </p>
      </header>

      <motion.div variants={itemVariants} className="space-y-2">
        <label htmlFor="resetCode" className="text-sm font-bold text-stone-400 uppercase tracking-wider">
          Reset Code
        </label>
        <input
          disabled={isResetPassword}
          id="resetCode"
          type="text"
          placeholder="Enter 6-digit code"
          className={inputStyles}
          {...register('resetCode', {
            required: 'Reset Code is required',
          })}
        />
        {errors?.resetCode && (
          <p className="text-xs font-medium text-red-400">
            {errors.resetCode.message}
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <label htmlFor="password" className="text-sm font-bold text-stone-400 uppercase tracking-wider">
          New Password
        </label>
        <input
          disabled={isResetPassword}
          id="password"
          type="password"
          placeholder="At least 8 characters"
          className={inputStyles}
          {...register('password', {
            required: 'New Password is required',
            minLength: { value: 8, message: 'Minimum length is 8 characters' },
          })}
        />
        {errors?.password && (
          <p className="text-xs font-medium text-red-400">
            {errors.password.message}
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-bold text-stone-400 uppercase tracking-wider">
          Confirm New Password
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
              value === getValues().password || 'Passwords do not match',
          })}
        />
        {errors?.confirmPassword && (
          <p className="text-xs font-medium text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-2 space-y-4">
        {updatedData && (
          <p className="rounded-lg bg-green-500/10 p-3 text-center text-sm font-medium text-green-500 border border-green-500/20">
            Password reset successfully!
          </p>
        )}
        {error && (
          <p className="rounded-lg bg-red-500/10 p-3 text-center text-sm font-medium text-red-400 border border-red-500/20">
            Failed to reset password. Please check your code and try again.
          </p>
        )}
        <Button
          disabled={isResetPassword}
          className="w-full rounded-xl py-3.5 font-bold shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] bg-blue-600 text-white hover:bg-blue-500"
        >
          {isResetPassword ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Resetting Password...
            </span>
          ) : 'Reset Password'}
        </Button>
      </motion.div>
    </motion.form>
  );
}

export default ResetPassword;
