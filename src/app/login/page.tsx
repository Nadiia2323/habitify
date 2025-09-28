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
};

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setServerError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });

    if (res?.error) {
      setServerError("Invalid email or password ❌");
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  useEffect(() => {
    if (session?.user) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="flex flex-row justify-around m-10">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
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

            {/* Email */}
            <div className="relative w-full">
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
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border ${
                  errors.email
                    ? "border-red-600 focus:border-red-600"
                    : "border-gray-300 focus:border-blue-600"
                } bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white dark:bg-gray-800 px-2
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Email
              </label>
              {errors.email && (
                <p className="mt-2 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
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
                className={`block px-2.5 pr-10 pb-2.5 pt-4 w-full text-sm rounded-lg border ${
                  errors.password
                    ? "border-red-600 focus:border-red-600"
                    : "border-gray-300 focus:border-blue-600"
                } bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white dark:bg-gray-800 px-2
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              >
                {isVisible ? (
                  <EyeIcon className="h-4 w-4" />
                ) : (
                  <EyeSlashIcon className="h-4 w-4" />
                )}
              </button>
              {errors.password && (
                <p className="mt-2 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error */}
            {serverError && (
              <p className="text-sm text-red-600">{serverError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>
        )}

        {/* Google login */}
        <div className="flex flex-col items-center justify-center gap-4 mt-6">
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Login with Google
          </button>
        </div>

        {/* Switch form */}
        <button
          type="button"
          onClick={() => setIsSignUp((prev) => !prev)}
          className="text-blue-700 hover:underline dark:text-blue-500 mt-4"
        >
          {isSignUp ? "Log in" : "Sign up"}
        </button>
      </div>

      {/* Info card */}
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          About GrowBit
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          I built Habitify to test a simple idea — can daily action for 24 days
          really form a habit? This app helps busy people build positive habits
          with reminders, tracking, and simple motivation. I am a solo
          developer, and this is just the beginning.
        </p>
        <Link
          href="#"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
