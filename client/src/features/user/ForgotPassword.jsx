import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useForgotPassword from './useForgotPassword';
import ResetPassword from './ResetPassword';
import Button from '../../ui/Button';

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

  return !data ? (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(submit)}
    >
      <header>
        <h2 className="text-xl font-bold text-white">Forgot Password?</h2>
        <p className="mt-2 text-sm text-stone-400">
          Enter your email address and we'll send you a code to reset your password.
        </p>
      </header>

      <motion.div variants={itemVariants} className="space-y-2">
        <label htmlFor="email" className="text-sm font-bold text-stone-400 uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className={inputStyles}
          disabled={isSentCode}
          {...register('email', { required: 'Email is required' })}
        />
        {errors?.email && (
          <p className="text-xs font-medium text-red-400">
            {errors.email.message}
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-2 space-y-4">
        {error && (
          <p className="rounded-lg bg-red-500/10 p-3 text-center text-sm font-medium text-red-400 border border-red-500/20">
            Failed to send code. Please try again.
          </p>
        )}
        <Button
          disabled={isSentCode}
          className="w-full rounded-xl py-3.5 font-bold shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] bg-blue-600 text-white hover:bg-blue-500"
        >
          {isSentCode ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending Code...
            </span>
          ) : 'Send Reset Code'}
        </Button>
      </motion.div>
    </motion.form>
  ) : (
    <ResetPassword />
  );
}

export default ForgotPassword;
