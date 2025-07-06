"use client";
import React from "react";

export default function Header() {
  return (
    <>
      <header>
        <div className="flex justify-between ">
          <div>
            <img
              className="size-30"
              src="https://res.cloudinary.com/dqgvmwnpl/image/upload/v1751808474/Habitify/logo-habitify_xm3juu.png"
              alt=""
            />
          </div>
          <nav className="pt-10">
            <a className="pr-8">Home</a>
            <a className="pr-8">About</a>
            <a className="pr-8">Login</a>
          </nav>
        </div>
      </header>
    </>
  );
}
