import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/store";

const SignUpForm = () => {
  const [signupFailed, setSignupFailed] = useState(false);

  const navigate = useNavigate();

  const { changeAuthenticationStatus } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setSignupFailed(true);
        return;
      }

      const result = await response.json();
      changeAuthenticationStatus(true);
      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="bg-white shadow-md flex flex-col gap-5 rounded-md font-lato py-12 px-15">
      <h2 className="uppercase text-3xl font-bold text-green-400">
        Register new account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="email" className="opacity-65 font-bold">
            Email address
          </label>
          <input
            className="bg-[#f2f2f2] py-2 px-4 font-light opacity-60"
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="name" className="opacity-65 font-bold">
            Name
          </label>
          <input
            className="bg-[#f2f2f2] py-2 px-4 font-light opacity-60"
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="opacity-65 font-bold">
            Password
          </label>
          <input
            className="bg-[#f2f2f2] py-2 px-4 font-light opacity-60"
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="opacity-65 font-bold">
            Confirm your password
          </label>
          <input
            className="bg-[#f2f2f2] py-2 px-4 font-light opacity-60"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm you password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-400">{errors.confirmPassword.message}</p>
          )}
          {signupFailed && (
            <p className="text-red-400">
              The user with this email is already exists or passwords are not
              the same
            </p>
          )}
        </div>

        <button
          className="bg-linear-to-r text-white from-green-500 to-green-300 px-10 py-4 mt-3 self-start rounded-[2rem] cursor-pointer duration-200 hover:scale-[1.1] hover:shadow-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up" : "Sign Up"}
        </button>

        <p className="opacity-65 font-bold mt-3">
          Already have the account?
          <span className="text-green-500 ml-1 ">
            <Link to="/login">Log in</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
