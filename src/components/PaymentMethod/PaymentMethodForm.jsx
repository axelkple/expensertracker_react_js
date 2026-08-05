import React from 'react';
import { Save, RotateCcw } from 'lucide-react';

const PaymentMethodForm = ({ methods, onFormSubmit, onFormReset }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-1">
      <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col gap-4">
          {/* Hidden Fields */}
          <input type="hidden" {...register("id")} />
          <input type="hidden" {...register("userId", { value: 10 })} />

          {/* Payment Method Name */}
          {/* <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method Name*
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Payment method name is required",
                maxLength: {
                  value: 40,
                  message: "Name cannot exceed 40 characters",
                },
              })}
              aria-invalid={errors.name ? "true" : "false"}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. Visa Credit Card, Chase Checking"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                {errors.name.message}
              </p>
            )}
          </div> */}

          {/* Payment Type */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method Name*
            </label>
            <select
              id="name"
              {...register("name", {
                required: "Payment name is required",
              })}
              aria-invalid={errors.type ? "true" : "false"}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="">Select type...</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="bank_account">Bank Account</option>
              <option value="cash">Cash</option>
              <option value="digital_wallet">Digital Wallet</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                {errors.type.message}
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

export default PaymentMethodForm;