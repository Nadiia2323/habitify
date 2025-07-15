"use client";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <div className="flex  justify-between max-w-screen-xl mx-auto p-4">
            <img
              src="https://res.cloudinary.com/dqgvmwnpl/image/upload/v1752593294/Growbit/ChatGPT_Image_15_%D0%B8%D1%8E%D0%BB._2025_%D0%B3._17_27_44_epeova.png"
              className="h-30 w-30"
              alt="Growbit logo"
            />

            <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
              <Link
                href="/login"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Login
              </Link>
              <Link
                href="#"
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign up
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
