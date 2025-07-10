import React from "react";

export default function Login() {
  return (
    <>
      <div className="flex flex-row justify-around m-10">
        <div className="flex flex-col items-center">
          <h3>Log in</h3>
          <label htmlFor="">email</label>
          <input type="email" className="rounded-sm bg-black" />
          <label htmlFor="">password</label>
          <input type="text" />
          <button>log in</button>
          <p>Dont have an account? Sign up</p>
        </div>
        <div>
          <h3>About Us</h3>
        </div>
      </div>
    </>
  );
}
