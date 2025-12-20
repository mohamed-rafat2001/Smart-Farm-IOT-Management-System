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
      className="flex flex-col gap-6 py-8"
      onSubmit={handleSubmit(Submit)}
    >
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
            disabled={isLogin}
            className={inputStyles}
            id="email"
            type="email"
            placeholder="Email Address"
            {...register('email', { required: 'Email is required' })}
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            disabled={isLogin}
            className={inputStyles}
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
        </div>
        <div className="flex items-center justify-between px-2">
          {errors?.password ? (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-black tracking-widest text-red-500 uppercase"
            >
              {errors.password.message}
            </motion.p>
          ) : (
            <div />
          )}
          <Link
            to="/forgot-password"
            className="text-[10px] font-black tracking-widest text-stone-500 uppercase transition-all hover:text-blue-400"
          >
            Forgot Password?
          </Link>
        </div>
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
          disabled={isLogin}
          className="w-full shadow-2xl shadow-blue-900/20"
        >
          {isLogin ? (
            <span className="flex items-center justify-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Authenticating...
            </span>
          ) : (
            'Sign In'
          )}
        </Button>

        <div className="flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-stone-800" />
          <p className="text-[10px] font-black tracking-[0.2em] text-stone-500 uppercase">
            New to Smart Farm?{' '}
            <Link
              to="/signup"
              className="ml-2 text-blue-500 transition-colors hover:text-blue-400"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.form>
  );
}

export default Login;
