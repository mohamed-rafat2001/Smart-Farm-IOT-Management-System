import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import { useSignUp } from './useSignUp';
import { Link } from 'react-router-dom';

function SignUp() {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { isSignUp, mutate, error } = useSignUp();
  const { errors } = formState;

  function Submit(data) {
    mutate(data);
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

  const inputStyles = `w-full bg-transparent p-3 text-stone-200 placeholder:text-stone-500 focus:outline-none disabled:opacity-50`;
  const containerStyles = `flex w-full items-center gap-x-4 rounded-xl border border-stone-700/50 bg-[#283039]/30 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 hover:border-stone-600`;

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 py-4"
      onSubmit={handleSubmit(Submit)}
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <div className="w-full space-y-1.5 sm:w-1/2">
          <div className={containerStyles}>
            <input
              disabled={isSignUp}
              className={inputStyles}
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register('firstName', {
                required: 'First name is required',
                minLength: { value: 2, message: 'Minimum length is 2' },
              })}
            />
          </div>
          {errors?.firstName && (
            <p className="px-1 text-xs font-medium text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="w-full space-y-1.5 sm:w-1/2">
          <div className={containerStyles}>
            <input
              disabled={isSignUp}
              className={inputStyles}
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register('lastName', {
                required: 'Last name is required',
                minLength: { value: 2, message: 'Minimum length is 2' },
              })}
            />
          </div>
          {errors?.lastName && (
            <p className="px-1 text-xs font-medium text-red-400">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-1.5">
        <div className={containerStyles}>
          <div className="pl-4 text-stone-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
          </div>
          <input
            disabled={isSignUp}
            className={inputStyles}
            id="email"
            type="email"
            placeholder="Email Address"
            {...register('email', { required: 'Email is required' })}
          />
        </div>
        {errors?.email && (
          <p className="px-1 text-xs font-medium text-red-400">
            {errors.email.message}
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-1.5">
        <div className={containerStyles}>
          <div className="pl-4 text-stone-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
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
          <p className="px-1 text-xs font-medium text-red-400">
            {errors.phoneNumber.message}
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-1.5">
        <div className={containerStyles}>
          <div className="pl-4 text-stone-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
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
                message: 'Minimum length is 8 characters',
              },
            })}
          />
        </div>
        {errors?.password && (
          <p className="px-1 text-xs font-medium text-red-400">
            {errors.password.message}
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-1.5">
        <div className={containerStyles}>
          <div className="pl-4 text-stone-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
            </svg>
          </div>
          <input
            disabled={isSignUp}
            className={inputStyles}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register('passwordConfirm', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === getValues().password || 'Passwords do not match',
            })}
          />
        </div>
        {errors?.passwordConfirm && (
          <p className="px-1 text-xs font-medium text-red-400">
            {errors.passwordConfirm.message}
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4 space-y-4">
        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm font-medium text-red-400">
            {error.message}
          </p>
        )}
        <Button
          disabled={isSignUp}
          className="w-full rounded-xl bg-blue-600 py-3.5 text-lg font-bold text-white shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.01] hover:bg-blue-500 active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100"
        >
          {isSignUp ? (
            <span className="flex items-center justify-center gap-2">
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
              Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="flex justify-center gap-2 text-sm text-stone-400">
          <span>Already have an account?</span>
          <Link
            to="/login"
            className="font-bold text-blue-400 transition-colors hover:text-blue-300"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </motion.form>
  );
}
export default SignUp;
