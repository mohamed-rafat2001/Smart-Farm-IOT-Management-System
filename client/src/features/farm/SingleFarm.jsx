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
  return (
    <div>
      <h1 className="text-gray-500">
        Overview of your farm and update details.
      </h1>
      <form className="mt-10 w-[100%]" onSubmit={handleSubmit(submit)}>
        <div className="grid w-[100%] grid-cols-2 items-center justify-between pb-5 sm:grid-cols-3">
          <label htmlFor="name" className="text-lg font-bold capitalize">
            Name
          </label>
          <input
            disabled={isUpdated}
            id="name"
            name="name"
            type="text"
            defaultValue={farm?.name}
            className="rounded-lg bg-black p-2 text-stone-400 focus:outline-0"
            {...register('name', {
              required: 'farm name is required',
            })}
          />
          {errors?.name?.message && (
            <p className="text-center text-red-500">*{errors.name.message}*</p>
          )}
        </div>
        <div className="grid w-[100%] grid-cols-2 items-center justify-between py-5 sm:grid-cols-3">
          <label htmlFor="location" className="text-lg font-bold capitalize">
            Location
          </label>
          <input
            disabled={isUpdated}
            id="location"
            name="location"
            defaultValue={farm?.location}
            type="text"
            className="rounded-lg bg-black p-2 text-stone-400 focus:outline-0"
            {...register('location', {
              required: 'location is required',
            })}
          />
          {errors?.location?.message && (
            <p className="text-center text-red-500">
              *{errors.location.message}*
            </p>
          )}
        </div>
        <div className="grid w-[100%] grid-cols-2 items-center justify-between py-5 sm:grid-cols-3">
          <label htmlFor="firebaseUrl" className="text-lg font-bold capitalize">
            Url
          </label>
          <input
            disabled={isUpdated}
            id="firebaseUrl"
            name="firebaseUrl"
            defaultValue={farm?.firebaseUrl}
            type="text"
            className="rounded-lg bg-black p-2 text-stone-400 focus:outline-0"
            {...register('firebaseUrl', {
              required: 'firebaseUrl is required',
            })}
          />

          {errors?.firebaseUrl?.message && (
            <p className="text-center text-red-500">
              *{errors.firebaseUrl.message}*
            </p>
          )}
        </div>
        <div className="mt-5 flex w-[100%] items-center justify-center gap-x-5 font-bold">
          <Button
            color="#c9fa75"
            className="rounded-full bg-[#283039] font-bold"
            disabled={isUpdated}
          >
            Update Farm
          </Button>
          {updatedData && <p className="text-green-500">Success</p>}
          {error && <p className="text-red-500">Not Success </p>}
        </div>
      </form>
    </div>
  );
}

export default SingleFarm;
