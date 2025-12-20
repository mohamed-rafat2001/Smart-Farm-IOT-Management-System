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
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const inputStyles = `w-full rounded-2xl border border-stone-800/50 bg-[#1b2127]/50 p-4 text-sm font-medium text-white placeholder-stone-500 transition-all duration-300 focus:border-blue-500/50 focus:bg-[#1b2127]/80 focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50 hover:border-stone-700 hover:bg-[#1b2127]/60`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative space-y-12 pb-10"
    >
      {/* Decorative Gradients */}
      <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-purple-600/5 blur-[120px]" />

      <header className="relative space-y-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="h-12 w-1.5 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
          <h1 className="text-4xl font-black tracking-tight text-white">
            Farm Details<span className="text-blue-500">.</span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-lg font-medium text-stone-400"
        >
          Review and optimize your farm's core identity and connectivity
          parameters.
        </motion.p>
      </header>

      <motion.form
        variants={itemVariants}
        className="group relative max-w-3xl overflow-hidden rounded-[2.5rem] border border-stone-800/50 bg-[#1b2127]/40 p-10 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-stone-700/50"
        onSubmit={handleSubmit(submit)}
      >
        <div className="space-y-8">
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start"
          >
            <div className="sm:pt-4">
              <label
                htmlFor="name"
                className="text-xs font-black tracking-[0.2em] text-stone-500 uppercase"
              >
                Farm Name
              </label>
            </div>
            <div className="sm:col-span-3">
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
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2 flex items-center gap-1.5 text-xs font-bold text-red-400"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.name.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start"
          >
            <div className="sm:pt-4">
              <label
                htmlFor="location"
                className="text-xs font-black tracking-[0.2em] text-stone-500 uppercase"
              >
                Location
              </label>
            </div>
            <div className="sm:col-span-3">
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
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2 flex items-center gap-1.5 text-xs font-bold text-red-400"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.location.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start"
          >
            <div className="sm:pt-4">
              <label
                htmlFor="firebaseUrl"
                className="text-xs font-black tracking-[0.2em] text-stone-500 uppercase"
              >
                Firebase URL
              </label>
            </div>
            <div className="sm:col-span-3">
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
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2 flex items-center gap-1.5 text-xs font-bold text-red-400"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.firebaseUrl.message}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-stone-800/50 pt-10 sm:flex-row"
        >
          <div className="flex flex-col gap-3">
            {updatedData && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-black tracking-wide text-green-500"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Farm updated successfully!
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-black tracking-wide text-red-500"
              >
                <div className="h-2 w-2 rounded-full bg-red-500" />
                Update failed
              </motion.div>
            )}
          </div>

          <Button
            disabled={isUpdated}
            className="group relative w-full overflow-hidden rounded-2xl bg-blue-600 px-10 py-4 text-sm font-black tracking-widest text-white shadow-2xl shadow-blue-900/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95 disabled:opacity-50 sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isUpdated ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    viewBox="0 0 24 24"
                  >
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
                  UPDATING...
                </>
              ) : (
                <>
                  UPDATE FARM
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </span>
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default SingleFarm;
