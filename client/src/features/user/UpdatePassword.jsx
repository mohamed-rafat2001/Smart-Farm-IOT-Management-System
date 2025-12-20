import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import useUpdatePassword from './useUpdatePassword.js';

function UpdatePassword() {
  const { update, updatedData, isUpdated, error } = useUpdatePassword();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  function submit(passwords) {
    update(passwords);
    reset();
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const inputStyles = `w-full rounded-xl border border-stone-700/50 bg-[#283039]/30 p-3 text-stone-200 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 hover:border-stone-600`;

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 flex flex-col gap-8 max-w-2xl"
      onSubmit={handleSubmit(submit)}
    >
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center"
      >
        <label
          htmlFor="password"
          className="text-sm font-bold text-stone-400 uppercase tracking-wider"
        >
          Current Password
        </label>
        <div className="sm:col-span-2">
          <input
            disabled={isUpdated}
            id="password"
            type="password"
            placeholder="••••••••"
            className={inputStyles}
            {...register('password', {
              required: 'Current password is required',
            })}
          />
          {errors?.password && (
            <p className="mt-1.5 text-xs font-medium text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center"
      >
        <label
          htmlFor="newPassword"
          className="text-sm font-bold text-stone-400 uppercase tracking-wider"
        >
          New Password
        </label>
        <div className="sm:col-span-2">
          <input
            disabled={isUpdated}
            id="newPassword"
            type="password"
            placeholder="••••••••"
            className={inputStyles}
            {...register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          {errors?.newPassword && (
            <p className="mt-1.5 text-xs font-medium text-red-400">
              {errors.newPassword.message}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center"
      >
        <label
          htmlFor="confirmPassword"
          className="text-sm font-bold text-stone-400 uppercase tracking-wider"
        >
          Confirm Password
        </label>
        <div className="sm:col-span-2">
          <input
            disabled={isUpdated}
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className={inputStyles}
            {...register('confirmNewPassword', {
              required: 'Confirm password is required',
              validate: (value) =>
                value === getValues().newPassword || 'Passwords do not match',
            })}
          />
          {errors?.confirmNewPassword && (
            <p className="mt-1.5 text-xs font-medium text-red-400">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-6 flex flex-col-reverse items-center justify-end gap-4 sm:flex-row"
      >
        {updatedData && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5 text-sm font-bold text-green-500 border border-green-500/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Password updated!
          </motion.div>
        )}
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-1.5 text-sm font-bold text-red-500 border border-red-500/20">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Update failed
          </div>
        )}
        <Button
          disabled={isUpdated}
          className="w-full sm:w-auto rounded-xl px-10 py-3.5 font-bold shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] bg-blue-600 text-white hover:bg-blue-500"
        >
          {isUpdated ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Updating...
            </span>
          ) : 'Update Password'}
        </Button>
      </motion.div>
    </motion.form>
  );
}

export default UpdatePassword;
