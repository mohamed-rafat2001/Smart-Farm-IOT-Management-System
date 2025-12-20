import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import useCreateFarm from './useCreateFarm';
function CreateFarm() {
  const { create, error, isCreated, farm } = useCreateFarm();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  function Submit(data) {
    create({
      ...data,
    });
    reset();
  }
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(Submit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-stone-300">
            Farm Name
          </label>
          <div className="group flex items-center gap-x-3 rounded-xl border border-stone-700/50 bg-stone-900/50 p-3 transition-all focus-within:border-blue-500 focus-within:bg-black/50">
            <svg
              className="h-5 w-5 text-stone-500 transition-colors group-focus-within:text-blue-500"
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
            <input
              disabled={isCreated}
              className="w-full bg-transparent text-white placeholder:text-stone-600 focus:outline-none"
              id="name"
              type="text"
              placeholder="Enter your farm name"
              {...register('name', { required: 'Farm name is required' })}
            />
          </div>
          {errors?.name && (
            <p className="text-xs font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="text-sm font-medium text-stone-300"
          >
            Location
          </label>
          <div className="group flex items-center gap-x-3 rounded-xl border border-stone-700/50 bg-stone-900/50 p-3 transition-all focus-within:border-blue-500 focus-within:bg-black/50">
            <svg
              className="h-5 w-5 text-stone-500 transition-colors group-focus-within:text-blue-500"
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
            <input
              disabled={isCreated}
              className="w-full bg-transparent text-white placeholder:text-stone-600 focus:outline-none"
              id="location"
              type="text"
              placeholder="e.g. California, USA"
              {...register('location', { required: 'Location is required' })}
            />
          </div>
          {errors?.location && (
            <p className="text-xs font-medium text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="firebaseUrl"
            className="text-sm font-medium text-stone-300"
          >
            Firebase URL
          </label>
          <div className="group flex items-center gap-x-3 rounded-xl border border-stone-700/50 bg-stone-900/50 p-3 transition-all focus-within:border-blue-500 focus-within:bg-black/50">
            <svg
              className="h-5 w-5 text-stone-500 transition-colors group-focus-within:text-blue-500"
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
            <input
              disabled={isCreated}
              className="w-full bg-transparent text-white placeholder:text-stone-600 focus:outline-none"
              id="firebaseUrl"
              type="text"
              placeholder="https://your-project.firebaseio.com"
              {...register('firebaseUrl', {
                required: 'Firebase URL is required',
              })}
            />
          </div>
          {errors?.firebaseUrl && (
            <p className="text-xs font-medium text-red-500">
              {errors.firebaseUrl.message}
            </p>
          )}
        </div>

        <div className="pt-4">
          <Button
            disabled={isCreated}
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-[0.98] disabled:opacity-50"
          >
            {isCreated ? 'Creating Farm...' : 'Create Farm'}
          </Button>
        </div>
      </form>
    </div>
  );
}
export default CreateFarm;
