import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../shared/components/Button';
import useCreateFarm from '../hooks/useCreateFarm';

function CreateFarm({ setAddFarm }) {
  const { create, isCreated } = useCreateFarm();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  function Submit(data) {
    create(data, {
      onSuccess: () => {
        setAddFarm(false);
        reset();
      },
    });
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
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

  const inputGroupStyles = `group flex items-center gap-x-4 rounded-2xl border border-stone-700/50 bg-[#1b2127]/80 p-4 transition-all duration-300 focus-within:border-blue-500 focus-within:bg-black/40 focus-within:ring-4 focus-within:ring-blue-500/10 hover:border-stone-600`;

  return (
    <div className="w-full">
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(Submit)}
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="space-y-3">
          <label
            htmlFor="name"
            className="ml-1 text-sm font-bold tracking-[0.15em] text-stone-500 uppercase"
          >
            Farm Name
          </label>
          <div className={inputGroupStyles}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-colors group-focus-within:bg-blue-500 group-focus-within:text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <input
              disabled={isCreated}
              className="w-full bg-transparent text-lg font-medium text-white placeholder:text-stone-600 focus:outline-none"
              id="name"
              type="text"
              placeholder="Enter your farm name"
              {...register('name', { required: 'Farm name is required' })}
            />
          </div>
          <AnimatePresence>
            {errors?.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-2 text-xs font-bold text-red-400"
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <label
            htmlFor="location"
            className="ml-1 text-sm font-bold tracking-[0.15em] text-stone-500 uppercase"
          >
            Location
          </label>
          <div className={inputGroupStyles}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 transition-colors group-focus-within:bg-purple-500 group-focus-within:text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <input
              disabled={isCreated}
              className="w-full bg-transparent text-lg font-medium text-white placeholder:text-stone-600 focus:outline-none"
              id="location"
              type="text"
              placeholder="e.g. California, USA"
              {...register('location', { required: 'Location is required' })}
            />
          </div>
          <AnimatePresence>
            {errors?.location && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-2 text-xs font-bold text-red-400"
              >
                {errors.location.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <label
            htmlFor="firebaseUrl"
            className="ml-1 text-sm font-bold tracking-[0.15em] text-stone-500 uppercase"
          >
            Firebase URL
          </label>
          <div className={inputGroupStyles}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-colors group-focus-within:bg-amber-500 group-focus-within:text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <input
              disabled={isCreated}
              className="w-full bg-transparent text-lg font-medium text-white placeholder:text-stone-600 focus:outline-none"
              id="firebaseUrl"
              type="text"
              placeholder="https://your-project.firebaseio.com"
              {...register('firebaseUrl', {
                required: 'Firebase URL is required',
              })}
            />
          </div>
          <AnimatePresence>
            {errors?.firebaseUrl && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-2 text-xs font-bold text-red-400"
              >
                {errors.firebaseUrl.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-6">
          <Button
            disabled={isCreated}
            type="submit"
            className="group relative w-full overflow-hidden !rounded-2xl bg-blue-600 !py-5 !font-black text-white shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50"
          >
            <div className="relative z-10 flex items-center justify-center gap-3 text-lg">
              {isCreated ? (
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
                  <span>Creating Farm...</span>
                </>
              ) : (
                <>
                  <span>Create Farm</span>
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </div>
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
}

export default CreateFarm;

