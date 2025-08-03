import { useForm } from "react-hook-form";
type PersonalData = {
  email: string;
  password: string;
  repeatPass: string;
  terms: boolean;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PersonalData>({ mode: "onTouched" });
  const password = watch("password");
  const onSubmit = (data: PersonalData) => {
    console.log("data :>> ", data);
    reset();
  };

  const getInputClass = (hasError: boolean) => {
    return hasError
      ? "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
      : "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  };
  const getLableClass = (hasError: boolean) => {
    return hasError
      ? "absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      : "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1";
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-4">
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
        />
        <label htmlFor="email" className={getLableClass(!!errors.email)}>
          Email
        </label>
        {errors.email && (
          <p
            id="outlined_error_help"
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          >
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
          type="password"
          id="password"
          className={getInputClass(!!errors.password)}
          placeholder=" "
          required
        />
        <label htmlFor="password" className={getLableClass(!!errors.password)}>
          Password
        </label>
        {errors.password && (
          <p
            id="outlined_error_help"
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          >
            <span className="font-medium">{errors.password.message}</span>
          </p>
        )}
      </div>
      <div className="relative">
        <input
          {...register("repeatPass", {
            required: "Please repeat the password",
            validate: (value) => value === password || "passwords do not match",
          })}
          type="password"
          id="repeatPass"
          className={getInputClass(!!errors.repeatPass)}
          placeholder=" "
        />
        <label
          htmlFor="repeatPass"
          className={getLableClass(!!errors.repeatPass)}
        >
          Repeat password
        </label>
        {errors.repeatPass && (
          <p
            id="outlined_error_help"
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          >
            <span className="font-medium">{errors.repeatPass.message}</span>
          </p>
        )}
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
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
