import React, { useState } from "react";
import registerImage from "../assets/register.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userApi } from "../features/api/userApi";
import { toast, Toaster } from "sonner";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // <-- added

type userRegisterForm = {
  firstName: string;
  lastName: string;
  contactPhone: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // for confirm

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<userRegisterForm>();

  const passwordValue = watch("password");
  const [registerUser, { isLoading }] = userApi.useRegisterUserMutation();

  const onSubmit = async (data: userRegisterForm) => {
    const loadingToastId = toast.loading("Registering Account...");
    console.log("Form data submitted:", data);

    try {
      const { confirmPassword, ...submitData } = data;

      const res = await registerUser(submitData).unwrap();

      toast.success(
        `${res.message || "Registration successful"}\n${
          res.emailNotification || ""
        }`,
        { id: loadingToastId }
      );

      navigate("/login");
    } catch (error: any) {
      console.log("Registration failed:", error);
      toast.error(
        "Failed to register: " +
          (error?.data?.error?.[0]?.message || "Unknown error")
      );
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <Navbar />
      <section className="w-screen min-h-screen bg-rose-50 px-4 pt-15">
        <div className="bg-white rounded-xl shadow-md w-full max-w-[1000px] min-h-[65vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden px-6 py-6 mx-auto items-center">
          {/* Left Image */}
          <div className="hidden md:block">
            <img
              src={registerImage}
              alt="Register Illustration"
              className="w-[500px] h-[500px] object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">
              Create Account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 4,
                      message: "First Name must be at least 4 characters",
                    },
                  })}
                />
                {errors.firstName && (
                  <span className="text-red-500">{errors.firstName.message}</span>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="text-red-500">Last Name is required</span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter your contact phone number"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                  {...register("contactPhone", { required: true })}
                />
                {errors.contactPhone && (
                  <span className="text-red-500">Contact Phone is required</span>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="e.g., 842 Nyahururu"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 5,
                      message: "Address must be at least 5 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s,.'-]{5,}$/,
                      message: "Address must include both letters and numbers",
                    },
                  })}
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address.message}</span>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="!text-gray-700 hover:text-rose-300  !bg-rose-300"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500">Password is required</span>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className= "!text-gray-700 hover:text-rose-300  !bg-rose-300"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition duration-300"
              >
                Register{" "}
                {isLoading && (
                  <span className="loading loading-spinner text-blue-600"></span>
                )}
              </button>
            </form>

            <p className="text-sm text-center mt-4 text-gray-700">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-rose-600 font-semibold hover:underline"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
