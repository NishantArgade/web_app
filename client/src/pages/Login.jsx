import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PinInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const Login = () => {
  const [showOTPField, setShowOTPField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      otp: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
    },
  });

  function handleSendOTP() {
    if (form.validateField("email").hasError) return;

    setShowOTPField(true);
  }

  function handleChangeLoginOption() {
    setShowPasswordField((prev) => !prev);
  }

  function handleLogin() {}
  return (
    <div className="w-9/12 mx-auto">
      <div className="mb-8">
        <p className="text-2xl font-medium">Log In</p>
        <p className="text-sm mt-2 text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </p>
      </div>

      <form className="flex flex-col gap-y-2">
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        {showPasswordField && (
          <TextInput
            label="Password"
            type="password"
            placeholder="Your password"
            {...form.getInputProps("password")}
          />
        )}
        {showOTPField && !showPasswordField && (
          <div className="flex flex-col">
            <p className="text-sm my-1">OTP</p>
            <PinInput placeholder="" {...form.getInputProps("otp")} />
          </div>
        )}
        <div className="flex justify-between mt-8">
          {showOTPField ? (
            <button
              type="button"
              className="text-sm px-6 font-semibold py-3 bg-blue-400 text-white rounded-sm shadow-md hover:bg-blue-500"
              onClick={handleLogin}
            >
              Log In
            </button>
          ) : (
            <button
              type="button"
              className="text-sm px-6 py-3 font-semibold bg-blue-400 text-white rounded-sm shadow-md hover:bg-blue-500"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          )}
          <button
            type="button"
            className="text-sm text-gray-700"
            onClick={handleChangeLoginOption}
          >
            {showPasswordField
              ? "Forgot password, Send OTP"
              : "Use password to login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
