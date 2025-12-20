import { motion } from 'framer-motion';
import useSingleFarm from './useSingleFarm';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import useUpdateFarm from './useUpdateFarm';

function SingleFarm() {
  const { farm } = useSingleFarm();
  const { isUpdated, updatedData, error, update } = useUpdateFarm();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function submit(data) {
    update(data);
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      <header>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Farm Details</h1>
        <p className="mt-2 text-stone-400">
          Overview of your farm and update details.
        </p>
      </header>

      <motion.form
        variants={itemVariants}
        className="mt-8 flex flex-col gap-8 max-w-2xl"
        onSubmit={handleSubmit(submit)}
      >
        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">
          <label htmlFor="name" className="text-sm font-bold text-stone-400 uppercase tracking-wider">
            Farm Name
          </label>
          <div className="sm:col-span-2">
            <input
              disabled={isUpdated}
              id="name"
              type="text"
              defaultValue={farm?.name}
              placeholder="Enter farm name"
              className={inputStyles}
              {...register('name', {
                required: 'Farm name is required',
              })}
            />
            {errors?.name && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">
          <label htmlFor="location" className="text-sm font-bold text-stone-400 uppercase tracking-wider">
            Location
          </label>
          <div className="sm:col-span-2">
            <input
              disabled={isUpdated}
              id="location"
              type="text"
              defaultValue={farm?.location}
              placeholder="Enter farm location"
              className={inputStyles}
              {...register('location', {
                required: 'Location is required',
              })}
            />
            {errors?.location && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.location.message}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">
          <label htmlFor="firebaseUrl" className="text-sm font-bold text-stone-400 uppercase tracking-wider">
            Firebase URL
          </label>
          <div className="sm:col-span-2">
            <input
              disabled={isUpdated}
              id="firebaseUrl"
              type="text"
              defaultValue={farm?.firebaseUrl}
              placeholder="Enter firebase URL"
              className={inputStyles}
              {...register('firebaseUrl', {
                required: 'Firebase URL is required',
              })}
            />
            {errors?.firebaseUrl && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.firebaseUrl.message}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 flex flex-col-reverse items-center justify-end gap-4 sm:flex-row">
          {updatedData && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5 text-sm font-bold text-green-500 border border-green-500/20"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Farm updated successfully!
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
            ) : 'Update Farm'}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default SingleFarm;
