import loginImage from "../assets/register.svg"; 
import {useForm} from 'react-hook-form'
import { toast, Toaster } from "sonner"
import { userApi } from "../features/api/userApi"
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";


type userLoginForm= {
  email:string;
  password:string
}



const Login = () => {
 const navigate= useNavigate()
 const dispatch = useDispatch();
 const [loginUser, {isLoading}] = userApi.useLoginUserMutation()
  const {register,handleSubmit,formState:{errors}}=useForm<userLoginForm>()

  const onSubmit = async (data: userLoginForm) => {
  const loadingToastId = toast.loading("Logging..");

  try {
    const res = await loginUser(data).unwrap();
    console.log("Login response:", res);

    toast.success("Login successful", { id: loadingToastId });

    // ✅ Clear previous user/token before setting new ones
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // ✅ Create new user object with correct userId
    const user = {
      userId: res.userId,
      email: res.email,
      firstName: res.firstName,
      lastName: res.lastName,
      role: res.role,
      contactPhone: res.contactPhone,
      address: res.address,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt
    };

    // ✅ Save new user in Redux + localStorage
    dispatch(setCredentials({ user, token: res.token }));

    // ✅ Redirect
    if (user.role === "admin") {
      navigate("/admindashboard");
    } else {
      navigate("/dashboard");
    }

  } catch (error: any) {
    console.log("Error occurred:", error);
    toast.error("Failed to LogIn: " + (error.data?.error || "Unknown error"));
    toast.dismiss(loadingToastId);
  }
};




  return (
    <>
     <Toaster richColors position="top-right"/>
     <Navbar/>

  <section className="w-screen min-h-screen bg-rose-50 px-4 pt-15">
  <div className="bg-white rounded-xl shadow-md 
    w-full max-w-[1000px] min-h-[65vh] 
    grid grid-cols-1 md:grid-cols-2 
    overflow-hidden px-6 py-6 mx-auto items-center">



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
          <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">Login to Your Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                 {...register ('email',{required:true})}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
              />
              {errors.email && <span className="text-red-500">Email is required</span>}   

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
            {...register('password',{required:true})}
            />
            {errors.password && <span className="text-red-500">Password is required</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition duration-300"
            >
                  {isLoading &&  <span className="loading loading-spinner text-blue-600"></span>}
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-700">
            Don't have an account?{" "}
            <a href="/register" className="text-rose-600 font-semibold hover:underline">
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
