import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const watchFields = watch();

  const handleNextStep = () => {
    if (step === 1) {
      if (watchFields.firstName && watchFields.lastName && watchFields.email) {
        setStep(step + 1);
      } else {
        toast.error('Please fill out all fields in Step 1');
      }
    } else if (step === 2) {
      if (watchFields.username && watchFields.password && watchFields.skills) {
        setStep(step + 1);
      } else {
        toast.error('Please fill out all fields in Step 2');
      }
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg">
      <ToastContainer />
      <div className="flex justify-between mb-6">
        <div className={`flex-1 h-1 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
        <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
        <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Step 1: Personal Information</h2>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">First Name</label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First Name is required' }}
                render={({ field }) => <input className="input" {...field} />}
              />
              {errors.firstName && <p className="text-red-500 mt-2">{errors.firstName.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Last Name</label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last Name is required' }}
                render={({ field }) => <input className="input" {...field} />}
              />
              {errors.lastName && <p className="text-red-500 mt-2">{errors.lastName.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Email</label>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } }}
                render={({ field }) => <input className="input" {...field} />}
              />
              {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}
            </div>
            <button type="button" className="btn bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={handleNextStep}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Step 2: Account Information</h2>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Username</label>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field }) => <input className="input" {...field} />}
              />
              {errors.username && <p className="text-red-500 mt-2">{errors.username.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Password</label>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
                render={({ field }) => <input type="password" className="input" {...field} />}
              />
              {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Skills</label>
              <Controller
                name="skills"
                control={control}
                rules={{ required: 'Skills are required' }}
                render={({ field }) => <input className="input" {...field} />}
              />
              {errors.skills && <p className="text-red-500 mt-2">{errors.skills.message}</p>}
            </div>
            <button type="button" className="btn bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={handleNextStep}>
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Step 3: Confirmation</h2>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Bio</label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => <textarea className="input h-24" {...field} />}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Portfolio URL</label>
              <Controller
                name="portfolio"
                control={control}
                render={({ field }) => <input className="input" {...field} />}
              />
            </div>
            <button type="submit" className="btn bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
