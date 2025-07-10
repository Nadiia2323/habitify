"use client";
import React from "react";
import Link from "next/link";

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
            <Link href="/" className="pr-8">
              Home
            </Link>
            <Link href="/about" className="pr-8">
              About
            </Link>
            <Link href="/login" className="pr-8">
              Login
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
