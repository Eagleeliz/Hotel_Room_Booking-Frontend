import  { useState } from "react";
import loginImage from "../assets/register.svg";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { userApi } from "../features/api/userApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Added for eye icons

type userLoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = userApi.useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginForm>();

  const onSubmit = async (data: userLoginForm) => {
    const loadingToastId = toast.loading("Logging in...");

    try {
      const res = await loginUser(data).unwrap();
      toast.success("Login successful", { id: loadingToastId });

      // Clear previous user/token
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      const user = {
        userId: res.userId,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        role: res.role,
        contactPhone: res.contactPhone,
        address: res.address,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      };

      // Save to Redux + localStorage
      dispatch(setCredentials({ user, token: res.token }));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.token);

      navigate(user.role === "admin" ? "/admindashboard" : "/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      const backendMessage =
        error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "Login failed. Please try again.";
      toast.error(backendMessage, { id: loadingToastId });
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <Navbar />

      <section className="w-screen min-h-screen bg-rose-50 px-4 pt-15">
        <div
          className="bg-white rounded-xl shadow-md 
          w-full max-w-[1000px] min-h-[65vh] 
          grid grid-cols-1 md:grid-cols-2 
          overflow-hidden px-6 py-6 mx-auto items-center"
        >
          {/* Left Side Image */}
          <div className="hidden md:block">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Side Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">
              Login to Your Account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-200 text-gray-800 placeholder:text-gray-400"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field with Toggle */}
             <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Password
  </label>
  <div className="flex items-center gap-2">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      {...register("password", {
        required: "Password is required",
      })}
      className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-200 text-gray-800 placeholder:text-gray-400"
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="!text-gray-800 hover:text-rose-300  !bg-rose-400"
    >
      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
    </button>
  </div>
  {errors.password && (
    <span className="text-red-500 text-sm">{errors.password.message}</span>
  )}
</div>


              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner !text-white" />
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-sm text-center mt-4 text-gray-700">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-rose-600 font-semibold hover:underline"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
