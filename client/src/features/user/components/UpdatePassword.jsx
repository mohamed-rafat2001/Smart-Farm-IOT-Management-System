import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Button from '../../../shared/components/Button';
import useUpdatePassword from '../hooks/useUpdatePassword.js';

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

  const inputStyles = `w-full rounded-2xl border border-stone-700/50 bg-[#1b2127]/80 px-6 py-4 text-white placeholder:text-stone-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50 hover:border-stone-600`;

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex max-w-3xl flex-col gap-10"
      onSubmit={handleSubmit(submit)}
    >
      <div className="space-y-8">
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center"
        >
          <label
            htmlFor="password"
            className="text-sm font-bold tracking-[0.2em] text-stone-500 uppercase"
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
              <p className="mt-2 text-xs font-semibold text-red-400/90 ml-2">
                {errors.password.message}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center"
        >
          <label
            htmlFor="newPassword"
            className="text-sm font-bold tracking-[0.2em] text-stone-500 uppercase"
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
              <p className="mt-2 text-xs font-semibold text-red-400/90 ml-2">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center"
        >
          <label
            htmlFor="confirmPassword"
            className="text-sm font-bold tracking-[0.2em] text-stone-500 uppercase"
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
              <p className="mt-2 text-xs font-semibold text-red-400/90 ml-2">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-4 flex flex-col-reverse items-center justify-end gap-6 sm:flex-row"
      >
        <AnimatePresence>
          {updatedData && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-3 text-sm font-bold text-green-400 backdrop-blur-sm"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Password Updated Successfully!
            </motion.div>
          )}
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-bold text-red-400 backdrop-blur-sm"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Update Failed
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          disabled={isUpdated}
          className="group relative w-full overflow-hidden !rounded-2xl !py-4 !px-12 !font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isUpdated ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Updating Password...
              </>
            ) : (
              <>
                <span>Update Password</span>
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

export default UpdatePassword;

