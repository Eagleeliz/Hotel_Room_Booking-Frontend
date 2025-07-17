
import registerImage from "../assets/register.svg"; // Replace with your image path
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { userApi } from "../features/api/userApi";
import { toast, Toaster } from "sonner"
import Navbar from "../components/Navbar";


type userRegisterForm={
  firstName:string;
  lastName:string;
  contactPhone:string;
  email:string;
  password:string
}


 const Register = () => {
   const navigate= useNavigate();
   const {register,handleSubmit,formState:{errors}}=useForm<userRegisterForm>()
   const [registerUser,{isLoading}]= userApi.useRegisterUserMutation()
   

const onSubmit=async(data:userRegisterForm)=>{
  const loadingToastId = toast.loading("Registering Account..");
console.log(data)
try{
  const res= await registerUser(data).unwrap()
  console.log(res)
  toast.success(res.message,{id:loadingToastId})
  navigate('/login')
  

}catch(error:any){
  console.log("Error occured:",error)
  toast.error("Failed to register"+ (error.data?.error))
    toast.dismiss(loadingToastId)
}
}




  return (

    <>
    
     <Toaster richColors
     position="top-right"

     />
     <Navbar/>
        <section className="w-screen min-h-screen bg-rose-50 px-4 pt-15">
          <div className="bg-white rounded-xl shadow-md 
            w-full max-w-[1000px] min-h-[65vh] 
            grid grid-cols-1 md:grid-cols-2 
            overflow-hidden px-6 py-6 mx-auto items-center">


        
        {/* Left Side Image (Hidden on small screens) */}
              <div className="hidden md:block">
          <img
            src={registerImage}
            alt="Register Illustration"
            className="w-[500px] h-[500px] object-cover"
          />
        </div>


        {/* Right Side Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">Create Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                {...register('firstName',{required:true})}

              />
              {errors.firstName && <span className="text-red-500">First Name is required</span>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
                {...register('lastName',{required:true})}

              />
              {errors.lastName && <span className="text-red-500">Last Name is required</span>}
            </div>
            
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
            {...register('email',{required:true})}
            />
            {errors.email && <span className="text-red-500">Email is  required</span>}
            </div>
             
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                placeholder="Enter your contact phone number"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
            {...register('contactPhone',{required:true})}
            />
             {errors.lastName && <span className="text-red-500">Contact Phone is required</span>}
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


            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register('password',{required:true})}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 placeholder:text-gray-400"
 
             />
                           {errors.password && <span className="text-red-500">Confirm assword is required</span>}
            </div> */}

            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition duration-300"
            >
              Register   {isLoading &&  <span className="loading loading-spinner text-blue-600"></span>}
            </button>
          </form>

          <p className="text-sm text-center mt-4  text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="text-rose-600 font-semibold hover:underline">
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
