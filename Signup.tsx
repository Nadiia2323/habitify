import { useForm } from "react-hook-form";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type PersonalData = {
  email: string;
  password: string;
  repeatPass: string;
  terms: boolean;
};

export default function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PersonalData>({ mode: "onTouched" });
  const password = watch("password");
  const onSubmit = async (data: PersonalData) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Server response :>> ", result);

      if (res.ok) {
        alert("User registered successfully ✅");
        reset();
        setIsVisible(false);
      } else {
        alert(result.message || "Something went wrong ❌");
      }
    } catch (err) {
      console.error("error :>> ", err);
      alert("Failed to connect to server 🚨");
    }
  };

  const getInputClass = (hasError: boolean) => {
    return hasError
      ? " block px-2.5 pr-10  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
      : " block px-2.5 pr-10  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  };
  const getLabelClass = (hasError: boolean) => {
    return hasError
      ? "absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      : "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1";
  };

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm space-y-4"
      noValidate
    >
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign up
      </h5>
      <div className="relative">
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
          type="email"
          id="email"
          className={getInputClass(!!errors.email)}
          placeholder=" "
          autoComplete="email"
        />
        <label htmlFor="email" className={getLabelClass(!!errors.email)}>
          Email
        </label>
        {errors.email && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
            <span className="font-medium">{errors.email.message}</span>
          </p>
        )}
      </div>
      <div className="relative">
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 character",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
              message: "Must include uppercase, number & special char",
            },
          })}
          type={isVisible ? "text" : "password"}
          id="password"
          className={getInputClass(!!errors.password)}
          placeholder=" "
          autoComplete="new-password"
        />

        <button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          onClick={handleToggle}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
        >
          {isVisible ? (
            <EyeIcon className="h-4 w-4"></EyeIcon>
          ) : (
            <EyeSlashIcon className="h-4 w-4"></EyeSlashIcon>
          )}
        </button>
        <label htmlFor="password" className={getLabelClass(!!errors.password)}>
          Password
        </label>
      </div>
      {errors.password && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          <span className="font-medium">{errors.password.message}</span>
        </p>
      )}
      <div className="relative">
        <input
          {...register("repeatPass", {
            required: "Please repeat the password",
            validate: (value) => value === password || "passwords do not match",
          })}
          type={isVisible ? "text" : "password"}
          id="repeatPass"
          className={getInputClass(!!errors.repeatPass)}
          placeholder=" "
          autoComplete="new-password"
        />
        <label
          htmlFor="repeatPass"
          className={getLabelClass(!!errors.repeatPass)}
        >
          Repeat password
        </label>
        <button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          onClick={handleToggle}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
        >
          {isVisible ? (
            <EyeIcon className="h-4 w-4"></EyeIcon>
          ) : (
            <EyeSlashIcon className="h-4 w-4"></EyeSlashIcon>
          )}
        </button>
      </div>
      {errors.repeatPass && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          <span className="font-medium">{errors.repeatPass.message}</span>
        </p>
      )}
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            {...register("terms", { required: "You must accept all terms" })}
          />
        </div>
        <label
          htmlFor="terms"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
        </label>
        {errors.terms && (
          <p
            id="outlined_error_help"
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          >
            <span className="font-medium">{errors.terms.message}</span>
          </p>
        )}
      </div>
      <button
        type="submit"
        className=" text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Register new account
      </button>
    </form>
  );
}
