import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useForgotPassword from '../hooks/useForgotPassword';
import ResetPassword from './ResetPassword';
import Button from '../../../shared/components/Button';

function ForgotPassword() {
  const { isSentCode, sentCode, data, error } = useForgotPassword();
  const { reset, handleSubmit, formState, register } = useForm();
  const { errors } = formState;

  function submit(data) {
    sentCode(data);
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
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const inputStyles = `w-full rounded-2xl border border-stone-700/50 bg-[#1b2127]/80 px-6 py-4 text-white placeholder:text-stone-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50 hover:border-stone-600`;

  return !data ? (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col gap-8 overflow-hidden"
      onSubmit={handleSubmit(submit)}
    >
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 -z-10 h-64 w-64 rounded-full bg-blue-600/5 blur-[80px]" />

      <header className="space-y-3">
        <h2 className="text-3xl font-black tracking-tight text-white">
          Forgot Password<span className="text-blue-500">?</span>
        </h2>
        <p className="text-lg leading-relaxed text-stone-400">
          Don't worry, it happens. Enter your email and we'll send you a
          recovery code.
        </p>
      </header>

      <motion.div variants={itemVariants} className="space-y-3">
        <label
          htmlFor="email"
          className="flex items-center gap-2 text-sm font-bold tracking-widest text-stone-400 uppercase"
        >
          <svg
            className="h-4 w-4 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
            />
          </svg>
          Email Address
        </label>
        <div className="group relative">
          <input
            type="email"
            id="email"
            placeholder="e.g. farmer@smartfarm.com"
            className={inputStyles}
            disabled={isSentCode}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
        </div>
        {errors?.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm font-medium text-red-400"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-2 space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-sm font-medium text-red-400 backdrop-blur-sm"
          >
            <svg
              className="h-5 w-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Failed to send code. Please check your email and try again.
          </motion.div>
        )}

        <Button
          disabled={isSentCode}
          className="group relative w-full overflow-hidden !rounded-2xl !px-8 !py-4 !font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
            {isSentCode ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending Recovery Code...
              </>
            ) : (
              <>
                <span>Send Reset Code</span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </span>
        </Button>
      </motion.div>
    </motion.form>
  ) : (
    <ResetPassword />
  );
}

export default ForgotPassword;

