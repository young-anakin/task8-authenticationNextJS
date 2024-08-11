'use client';
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import Cookie from "js-cookie";

type FormFields = {
  email: string;
  password: string;
};



const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const { register, handleSubmit,  formState: { errors, isSubmitting } } = useForm<FormFields>(
    {
      defaultValues:{
        email: "",
        password: ""
      }
    }
  );

  const onSubmit: SubmitHandler<FormFields> = async (data:FormFields) => {
    const formData = JSON.stringify(data);
    setLoading(true);
    console.log(formData);
    try{
      const response = await axios.post(
        "https://akil-backend.onrender.com/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response.status === 200) {
        console.log(response);
        Cookie.set("hireHubToken", response.data.data.refreshToken);
        Cookie.set("hireHubAccessToken", response.data.data.accessToken);
        router.push("/landing");
      } else {
        console.log("Something went wrong");
      }
      // await new Promise((resolve)=> setTimeout(resolve, 1000));
      // throw new Error();      
    }
    catch (err) {
      setLoading(false);
      console.log(err);
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className='flex h-[70vh]'>
      <div className='flex-1 basis-1/3 p-4 border-gray-300 gap-12'></div>

      <div className='flex justify-center flex-1 basis-1/3 gap-6 items-center p-4 border-gray-300'>
        <div className='flex flex-col items-center gap-3'>
          <h1 className='font-poppins font-extrabold text-3xl'>Welcome Back,</h1>  
                
          <div className="flex gap-16 items-center mt-5 text-sm">
            <hr className="justify-start w-[110px] flex-grow border-t border-gray-300" />
            <span className="px-3 text-gray-500"></span>
            <hr className="justify-end w-[110px] flex-grow border-t border-gray-300" />
          </div>

          <div className='gap-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='py-4 flex flex-col gap-2'>
                <label htmlFor="email">
                  <span className="font-semibold text-[#515B6F] font-epilogue">Email Address</span>
                </label>
                <input
                  placeholder="Enter email address"
                  className="rounded color-white px-3 py-4 border border-gray-300"
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    validate: (value) => {
                      
                      if (!value.includes('@')){
                        return "Email must include @"
                      }
                      return true
                    }
                  })}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>
              <div className='py-4 flex flex-col gap-2'>
                <label htmlFor="password">
                  <span className='font-semibold text-[#515B6F] font-epilogue'>Password</span>
                </label>
                <input
                  placeholder="Enter Password"
                  className="rounded color-white px-3 py-4 border border-gray-300"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: 8
                  })}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>
              <div className='flex flex-col gap-2'>
                <button
                  disabled ={isSubmitting}
                  className="px-44 py-3 rounded-full bg-[#2D298E] text-white py-3"
                  type="submit"
                >
                  {isSubmitting? "Loading" : "Submit"}
                </button>
                {errors.root && <span className="text-red-500">{errors.root.message}</span>}

              </div>
              <div className='py-4 flex gap-2'>
                <p className='font-epilogue font-light text-[#202430]'>Don't have an account?</p>
                <Link href="/auth/signup" className="text-[#2D298E] font-semibold">Signup</Link>
              </div>
            </form>
          </div>  
        </div>
      </div>        
      <div className='flex-1 basis-1/3 p-4 border-gray-300 gap-12'></div>
    </div>
  );
}

export default Login;
