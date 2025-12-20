import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import useLogin from './useLogin';
import { Link } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { isLogin, loginUser, error } = useLogin();
  const { errors } = formState;

  function Submit(data) {
    loginUser(data);
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
      className="flex flex-col gap-6 py-6"
      onSubmit={handleSubmit(Submit)}
    >
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
            disabled={isLogin}
            className={inputStyles}
            id="email"
            type="email"
            placeholder="Enter your email"
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
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
            </svg>
          </div>
          <input
            disabled={isLogin}
            className={inputStyles}
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
          />
        </div>
        <div className="flex items-center justify-between px-1">
          {errors?.password ? (
            <p className="text-xs font-medium text-red-400">
              {errors.password.message}
            </p>
          ) : (
            <div />
          )}
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-stone-400 transition-colors hover:text-blue-400"
          >
            Forgot Password?
          </Link>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-2 space-y-4">
        {error && (
          <p className="rounded-lg bg-red-500/10 p-3 text-center text-sm font-medium text-red-400 border border-red-500/20">
            {error.message}
          </p>
        )}
        <Button
          disabled={isLogin}
          className="w-full rounded-xl py-3.5 text-lg font-bold shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-70 disabled:hover:scale-100"
        >
          {isLogin ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing in...
            </span>
          ) : 'Sign In'}
        </Button>

        <div className="flex justify-center gap-2 text-sm text-stone-400">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className="font-bold text-blue-400 transition-colors hover:text-blue-300"
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </motion.form>
  );
}

export default Login;
