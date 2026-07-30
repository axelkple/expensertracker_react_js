import { Save, RotateCcw } from 'lucide-react';
import { useForm } from "react-hook-form"

const UserForm = ({ methods, onFormReset, onFormSubmit }) => {



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;
 

 
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-1">
            <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="flex flex-col gap-4">
                    <input
                        type="hidden" {...register("id")}
                    />
                    {/* First Name */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name*
                        </label>
                        <input
                            type="test" {...register("firstName", {
                                required: true,
                                maxLength: 30
                            })}
                            aria-invalid={errors.firstName ? "true" : "false"}
                            // id="firstName"
                            // name="firstName"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter first name"
                        />

                        {errors.firstName?.type === "required" && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                First Name is required
                            </p>
                        )}

                        {errors.firstName?.type === "maxLength" && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                First Name can not exceed 30 characteres
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name*
                        </label>
                        <input
                            type="test" {...register("lastName", {
                                required: true,
                                maxLength: 30
                            })}
                            // id="lastName"
                            // name="lastName"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter last name"
                        />
                        {errors.lastName?.type === "required" && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                Last Name is required
                            </p>
                        )}

                        {errors.lastName?.type === "maxLength" && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                Last Name can not exceed 30 characteres
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email*
                        </label>
                        <input
                            type="email" {...register("Email", {
                                required: true,
                                maxLength: 30
                            })}
                            // id="email"
                            // name="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter Email"
                        />
                        {errors.email?.type === "required" && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                Email is required
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="Password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password*
                        </label>
                        <input
                            type="password" {...register("Password", {
                                required: true,
                                maxLength: 30
                            })}
                            // id="password"
                            // name="password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter Password"
                        />
                        {errors.password?.type === "required" && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                password is required
                            </p>
                        )}
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        type="submit" 
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </button>

                    <button
                        type="button" onClick ={onFormReset}
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

export default UserForm;