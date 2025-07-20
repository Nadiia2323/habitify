"use client";
import React, { useState } from "react";
import Link from "next/link";
import Signup from "../../../components/Signup";

type PersonalData = {
  email: string;
  password: string;
};
type Errors = {
  email: string;
  password: string;
};

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPersonalData, setIsPersonalData] = useState<PersonalData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });

  function handleToggle() {
    setIsSignUp((prev) => !prev);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setIsPersonalData((prev) => ({ ...prev, [name]: value }));
    if (
      name === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      setErrors((prev) => ({ ...prev, email: "invalid email" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (name === "password" && value.length < 8) {
      setErrors((prev) => ({ ...prev, password: "password is too short" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (errors.email || errors.password) {
      return;
    }
    console.log("isPersonalData :>> ", isPersonalData);
  }
  return (
    <>
      <div className="flex flex-row justify-around m-10">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {isSignUp ? (
            <Signup />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-4"
            >
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Log in
              </h5>

              <div className="relative w-full w-max-sm">
                <input
                  type="email"
                  name="email"
                  value={isPersonalData.email}
                  className={
                    errors.email
                      ? "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                      : "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  }
                  placeholder=" "
                  onChange={handleChange}
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
                {errors.email && (
                  <p
                    id="outlined_error_help"
                    className="mt-2 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">{errors.email}</span>
                  </p>
                )}
              </div>
              <div></div>

              <div className="relative w-full w-max-sm">
                <input
                  type="password"
                  name="password"
                  value={isPersonalData.password}
                  className={
                    errors.password
                      ? "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                      : "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  }
                  placeholder=" "
                  onChange={handleChange}
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
                {errors.password && (
                  <p
                    id="outlined_error_help"
                    className="mt-2 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">{errors.password}</span>
                  </p>
                )}
              </div>
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
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
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

          <a
            onClick={handleToggle}
            href="#"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </a>
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
            habits with reminders, tracking, and simple motivation. I'm a solo
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
