import React from 'react';
import { Save, RotateCcw } from 'lucide-react';

const AccountForm = ({ methods, onFormSubmit, onFormReset }) => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-1">
      <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col gap-4">
          <input type="hidden" {...register("id")} />
           <input
              id="name"
              type="hidden"
              {...register("UserId", {
               value:10,
        
              })}
              aria-invalid={errors.name ? "true" : "false"}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter name"
            />

          {/* Account Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name*
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 30,
                  message: "Name cannot exceed 30 characters",
                },
              })}
              aria-invalid={errors.name ? "true" : "false"}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Account Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Type*
            </label>
            <input
              id="type"
              type="text"
              {...register("type", {
                required: "Type is required",
                maxLength: {
                  value: 30,
                  message: "Type cannot exceed 30 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. Checking, Savings"
            />
            {errors.type && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                {errors.type.message}
              </p>
            )}
          </div>

          {/* Balance */}
          <div>
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-2">
              Balance*
            </label>
            <input
              id="balance"
              type="number"
              step="any"
              {...register("balance", {
                required: "Balance is required",
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter balance"
            />
            {errors.balance && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                {errors.balance.message}
              </p>
            )}
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              Currency*
            </label>
            <input
              id="currency"
              type="decimal"
              {...register("currency", {
                required: "Currency is required",
                minLength: {
                  value: 3,
                  message: "Currency must be at least 3 characters (e.g. USD)",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. USD, EUR"
            />
            {errors.currency && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                {errors.currency.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>

          <button
            type="button"
            onClick={onFormReset}
            className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;