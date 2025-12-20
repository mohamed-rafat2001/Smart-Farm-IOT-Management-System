import { motion } from 'framer-motion';
import useAuth from '../../Hooks/useAuth';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import usePersonalDetails from './usePersonalDetails';

function PersonalDetails() {
  const { data } = useAuth();
  const { update, isUpdated, updatedData } = usePersonalDetails();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function submit(details) {
    update(details);
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
      className="mt-8 flex max-w-2xl flex-col gap-8"
      onSubmit={handleSubmit(submit)}
    >
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center"
      >
        <label
          htmlFor="firstName"
          className="text-sm font-bold tracking-wider text-stone-400 uppercase"
        >
          First Name
        </label>
        <div className="sm:col-span-2">
          <input
            id="firstName"
            defaultValue={data?.firstName}
            disabled={isUpdated}
            placeholder="Enter your first name"
            className={inputStyles}
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'Minimum length is 2' },
            })}
          />
          {errors?.firstName && (
            <p className="mt-1.5 text-xs font-medium text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center"
      >
        <label
          htmlFor="lastName"
          className="text-sm font-bold tracking-wider text-stone-400 uppercase"
        >
          Last Name
        </label>
        <div className="sm:col-span-2">
          <input
            id="lastName"
            defaultValue={data?.lastName}
            disabled={isUpdated}
            placeholder="Enter your last name"
            className={inputStyles}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Minimum length is 2' },
            })}
          />
          {errors?.lastName && (
            <p className="mt-1.5 text-xs font-medium text-red-400">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center"
      >
        <label
          htmlFor="email"
          className="text-sm font-bold tracking-wider text-stone-400 uppercase"
        >
          Email Address
        </label>
        <div className="sm:col-span-2">
          <input
            id="email"
            type="email"
            defaultValue={data?.email}
            disabled={isUpdated}
            placeholder="Enter your email"
            className={inputStyles}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors?.email && (
            <p className="mt-1.5 text-xs font-medium text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center"
      >
        <label
          htmlFor="phoneNumber"
          className="text-sm font-bold tracking-wider text-stone-400 uppercase"
        >
          Phone Number
        </label>
        <div className="sm:col-span-2">
          <input
            id="phoneNumber"
            defaultValue={data?.phoneNumber}
            disabled={isUpdated}
            placeholder="Enter your phone number"
            className={inputStyles}
            {...register('phoneNumber', {
              required: 'Phone number is required',
            })}
          />
          {errors?.phoneNumber && (
            <p className="mt-1.5 text-xs font-medium text-red-400">
              {errors.phoneNumber.message}
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
            className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-sm font-bold text-green-500"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Successfully updated!
          </motion.div>
        )}
        <Button
          disabled={isUpdated}
          className="w-full rounded-xl bg-blue-600 px-10 py-3.5 font-bold text-white shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.02] hover:bg-blue-500 active:scale-[0.98] sm:w-auto"
        >
          {isUpdated ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
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
              Updating...
            </span>
          ) : (
            'Update Details'
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}

export default PersonalDetails;
