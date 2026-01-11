import { motion } from 'framer-motion';
import Button from '../../../shared/components/Button';
import { useForm } from 'react-hook-form';
import { useSignUp } from '../hooks/useSignUp';
import { Link } from 'react-router-dom';

function SignUp() {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { isSignUp, mutate, error } = useSignUp();
  const { errors } = formState;

  function Submit(data) {
    mutate(data);
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const inputStyles = `w-full bg-transparent px-4 py-4 text-sm font-medium text-white placeholder:text-stone-500 focus:outline-none disabled:opacity-50`;
  const containerStyles = `group flex w-full items-center gap-x-2 rounded-2xl border border-stone-800/50 bg-[#1b2127]/50 transition-all duration-300 focus-within:border-blue-500/50 focus-within:bg-[#1b2127] focus-within:ring-4 focus-within:ring-blue-500/10 hover:border-stone-700 hover:bg-[#1b2127]/80`;

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 py-6"
      onSubmit={handleSubmit(Submit)}
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <div className="w-full space-y-2 sm:w-1/2">
          <div className={containerStyles}>
            <input
              disabled={isSignUp}
              className={inputStyles}
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register('firstName', {
                required: 'First name is required',
                minLength: { value: 2, message: 'Min 2 characters' },
              })}
            />
          </div>
          {errors?.firstName && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase"
            >
              {errors.firstName.message}
            </motion.p>
          )}
        </div>

        <div className="w-full space-y-2 sm:w-1/2">
          <div className={containerStyles}>
            <input
              disabled={isSignUp}
              className={inputStyles}
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register('lastName', {
                required: 'Last name is required',
                minLength: { value: 2, message: 'Min 2 characters' },
              })}
            />
          </div>
          {errors?.lastName && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase"
            >
              {errors.lastName.message}
            </motion.p>
          )}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <div className={containerStyles}>
          <div className="pl-4 text-stone-500 transition-colors group-focus-within:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <input
            disabled={isSignUp}
            className={inputStyles}
            id="email"
            type="email"
            placeholder="Email Address"
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
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase"
          >
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <div className={containerStyles}>
          <div className="pl-4 text-stone-500 transition-colors group-focus-within:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <input
            disabled={isSignUp}
            className={inputStyles}
            id="phone"
            type="text"
            placeholder="Phone Number"
            {...register('phoneNumber', {
              required: 'Phone number is required',
            })}
          />
        </div>
        {errors?.phoneNumber && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase"
          >
            {errors.phoneNumber.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <div className={containerStyles}>
          <div className="pl-4 text-stone-500 transition-colors group-focus-within:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            disabled={isSignUp}
            className={inputStyles}
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) || 'Must include an uppercase letter',
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) || 'Must include a lowercase letter',
                hasNumber: (value) =>
                  /[0-9]/.test(value) || 'Must include a number',
                hasSymbol: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  'Must include a special character',
              },
            })}
          />
        </div>
        {errors?.password && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase"
          >
            {errors.password.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <div className={containerStyles}>
          <div className="pl-4 text-stone-500 transition-colors group-focus-within:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <input
            disabled={isSignUp}
            className={inputStyles}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: 'Confirm your password',
              validate: (value) =>
                value === getValues().password || 'Passwords mismatch',
            })}
          />
        </div>
        {errors?.confirmPassword && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase"
          >
            {errors.confirmPassword.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4 space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-center"
          >
            <p className="text-[10px] font-black tracking-widest text-red-500 uppercase">
              {error.message}
            </p>
          </motion.div>
        )}

        <Button
          disabled={isSignUp}
          className="w-full shadow-2xl shadow-blue-900/20"
        >
          {isSignUp ? (
            <span className="flex items-center justify-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Processing...
            </span>
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-stone-800" />
          <p className="text-[10px] font-black tracking-[0.2em] text-stone-500 uppercase">
            Already a member?{' '}
            <Link
              to="/login"
              className="ml-2 text-blue-500 transition-colors hover:text-blue-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.form>
  );
}

export default SignUp;
