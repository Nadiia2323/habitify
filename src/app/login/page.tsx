"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Signup from "../../../components/Signup";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const normalizedEmail = data.email.trim().toLowerCase();
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          password: data.password,
        }),
      });

      const result = await res.json();
      console.log("serverLoginREsult :>> ", result);
      if (res.ok) {
        alert("Login successful ✅");
        router.push("/dashboard");
      } else {
        alert(result.error || "Invalid credentials ❌");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  function handleToggle() {
    setIsSignUp((prev) => !prev);
  }

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard"); // редирект если пользователь залогинен
    }
  }, [session, router]);

  return (
    <>
      <div className="flex flex-row justify-around m-10">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {isSignUp ? (
            <Signup />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center space-y-4"
              noValidate
            >
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Log in
              </h5>

              <div className="relative w-full ">
                <input
                  autoComplete="username"
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                  className={
                    errors.email
                      ? "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                      : "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  }
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className={
                    errors.email
                      ? "absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      : "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  }
                >
                  Email
                </label>
              </div>
              {errors.email && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  <span className="font-medium">{errors.email.message}</span>
                </p>
              )}
              <div className="relative w-full">
                <input
                  id="password"
                  autoComplete="current-password"
                  type={isVisible ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className={
                    errors.password
                      ? "block px-2.5 pr-10 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                      : "block px-2.5 pr-10 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  }
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className={
                    errors.password
                      ? "absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      : "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  }
                >
                  Password
                </label>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  type="button"
                  onClick={handleVisibility}
                >
                  {isVisible ? (
                    <EyeIcon className="h-4 w-4"></EyeIcon>
                  ) : (
                    <EyeSlashIcon className="h-4 w-4"></EyeSlashIcon>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  <span className="font-medium">{errors.password.message}</span>
                </p>
              )}
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                Log in
              </button>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      {...register("remember")}
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div>
              <div className="flex items-start space-x-2 w-full">
                <p>Dont have an account? </p>
              </div>
            </form>
          )}
          <div className="flex flex-col items-center justify-center gap-4 mt-6">
            <button
              onClick={() => signIn("google")}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Login with Google
            </button>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </div>
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              About GrowBit
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            I built Habitify to test a simple idea — can daily action for 24
            days really form a habit? This app helps busy people build positive
            habits with reminders, tracking, and simple motivation.I am a solo
            developer, and this is just the beginning.
          </p>
          <Link
            href="#"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Read more
          </Link>
        </div>
      </div>
    </>
  );
}
