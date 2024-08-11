"use client"
import axios, { AxiosError, isAxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";


interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
const Signup = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },

  });

  const onSubmit = async (data: FormValues) => {
    console.log("hi")
    localStorage.setItem("userEmail", data.email);
    const formData = JSON.stringify({ ...data, role: "user" });
    console.log(formData);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://akil-backend.onrender.com/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      router.push("/auth/Verify");

      if (response.status === 200) {
        console.log("Success");
      }
    } catch (err) {
      setLoading(false);
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      console.log("what")
      setLoading(false);
    }

  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className='flex '>
            <div className='flex-1 basis-1/4 p-4  gap-12'></div>
    
            <div className=' flex justify-center flex-1 basis-1/4  items-center p-4'>
                <div  className='flex flex-col items-center gap-3 '>
                    <h1 className='font-poppins font-extrabold text-3xl'>Sign Up Today!</h1>  
                      <button onClick = {handleGoogleSignUp} className=' w-[540px] flex items-center justify-center rounded border border-[#2D298E]'>
                            <GoogleIcon />
                            <p className='py-4  px-2 font-bold text-xl font-epilogue text-[#2D298E]'>Sign Up with Google</p>
                      </button>
                    <div className="flex items-center mt-5 text-sm">
                      <hr className="w-[110px] flex-grow border-t border-gray-300" />
                      <span className="px-3 text-gray-500 text-">Or Sign Up with Email</span>
                      <hr className="w-[110px] flex-grow border-t border-gray-300" />
                    </div>
    
    
                    <div className='gap-5'>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=' py-4 flex flex-col gap-2'>
                          <label ><span className="font-semibold text-[#515B6F] font-epilogue">Full Name</span></label>
                          <input placeholder = "Enter your full name"
                          className = " rounded color-white px-3 py-4 border border-gray-300 "
                           type = "text" 
                           {...register("name")}
                           ></input>
                        </div>
                        <div className=' py-4 flex flex-col gap-2'>
                          <label ><span className="font-semibold text-[#515B6F] font-epilogue">Email Address</span></label>
                          <input placeholder = "Enter email address"
                          className = " rounded color-white px-3 py-4 border border-gray-300 "
                          type = "email" 
                          {...register("email")}></input>
                        </div>
                        <div className=' py-4 flex flex-col gap-2'>
                          <label ><span className='font-semibold text-[#515B6F] font-epilogue'>Password</span></label>
                          <input 
                          placeholder = "Enter Password" 
                          className = "rounded color-white px-3 py-4 border border-gray-300 " 
                          type = "password"               
                          {...register("password")}></input>
                        </div>
                        <div className=' py-4 flex flex-col gap-2'>
                          <label ><span className='font-semibold text-[#515B6F] font-epilogue'>Confirm Password</span></label>
                          <input 
                          placeholder = "Enter Password" 
                          className = "rounded color-white px-3 py-4 border border-gray-300 " 
                          type = "password" 
                          {...register("confirmPassword")}
                          ></input>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <button className = "px-44 py-3 rounded-full bg-[#2D298E] text-white py-3">Continue </button>
                        </div>
                    </form>

                        <div className='py-4 flex gap-2'>
                          <p className='font-epilogue font-light text-[#202430]'>Already have an account?</p>
                          <Link href="/auth/login" className="text-[#2D298E] font-semibold">
                            Login
                          </Link>
                        </div>
                        <div className='flex font-epilogue text-[#7C8493]'>
                            <p>By clicking Continue, you acknowledge that you have read and accepted our 
                              <a href= "www.google.com" className='text-[#2D298E]'>Terms of Service</a> and <a className='text-[#2D298E]'>Privacy Policy</a>
                            </p>
                        </div>
                    </div>  
                </div>
            </div>        
            <div className='flex-1 basis-1/4 p-4 border-gray-300 gap-12'></div>
    
        </div>  )
    }

    function GoogleIcon() {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px" height="25px">
                            <path fill="#4285F4" d="M24 9.5c2.53 0 4.9 0.87 6.75 2.32l5.03-5.03C32.57 4.2 28.45 2.5 24 2.5 14.45 2.5 6.55 8.7 3.5 17.5l6.82 5.28C12.27 16.15 17.7 9.5 24 9.5z"/>
                            <path fill="#34A853" d="M46.5 24.3c0-1.26-0.1-2.42-0.27-3.58H24v7.07h12.7c-0.55 2.82-2.22 5.21-4.68 6.83l7.43 5.74C44.55 36.15 46.5 30.58 46.5 24.3z"/>
                            <path fill="#FBBC05" d="M10.32 28.78c-0.87-2.63-0.87-5.45 0-8.08L3.5 15.42C1.1 20.58 1.1 27.42 3.5 32.58l6.82-5.28z"/>
                            <path fill="#EA4335" d="M24 46.5c6.24 0 11.45-2.15 15.27-5.83l-7.43-5.74C29.47 36.73 26.83 37.5 24 37.5c-6.3 0-11.73-6.65-13.18-15.28L3.5 32.58C6.55 41.3 14.45 46.5 24 46.5z"/>
                          </svg>
      )
    }
export default Signup