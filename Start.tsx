import React from "react";
import Link from "next/link";

export default function Start() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center space-y-4">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Growbit - Your path
          </span>{" "}
          to productivity
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 ">
          Start today — change your life step by step.
        </p>
        <Link
          href="/login"
          className=" text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Get started
        </Link>
      </div>
    </>
  );
}
