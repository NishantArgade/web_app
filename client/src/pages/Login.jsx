import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput, PinInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { login, sendOTPMail } from "../api/authApi";
import { toast } from "react-hot-toast";
import { queryClient } from "../main";

const Login = () => {
  const navigate = useNavigate();
  const [showOTPField, setShowOTPField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      otp: "",
    },

    validate: {
      email: (value) => {
        if (value.length === 0) return "Email is required";
        else return /^\S+@\S+$/.test(value) ? null : "Invalid email address";
      },
    },
  });

  const { mutate: sendOTPMutate, isPending: sendOTPIsPending } = useMutation({
    mutationKey: "sendOTP",
    mutationFn: sendOTPMail,
    onSuccess: () => {
      setShowOTPField(true);
    },
  });
  const { mutate: loginMutate, isPending: loginIsPending } = useMutation({
    mutationKey: "login",
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries("checkAuth");
      navigate("/");
      form.reset();
      toast.success("Welcome back!");
    },
    onError: (err) => toast.error(err.response?.data?.message),
  });

  function handleSendOTP() {
    if (form.validateField("email").hasError) return;

    const promise = new Promise((resolve, reject) => {
      sendOTPMutate(
        { email: form.values.email },
        {
          onSuccess: () => resolve(),
          onError: (err) => reject(err),
        }
      );
    });

    toast.promise(promise, {
      loading: "Sending OTP...",
      success: "OTP sent successfully",
      error: (err) => toast.error(err.response?.data?.message),
    });
  }

  function handleChangeLoginOption() {
    setShowPasswordField((prev) => !prev);
    form.reset();
    form.setErrors({});
  }

  function handleLogin() {
    if (
      (showPasswordField &&
        form.values.email.length !== 0 &&
        form.values.password.length !== 0) ||
      (showOTPField &&
        form.values.email.length !== 0 &&
        form.values.otp.length !== 0)
    )
      loginMutate(form.values);
    else return form.validate();
  }

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
          <PasswordInput
            withAsterisk
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
          {showOTPField || showPasswordField ? (
            <button
              type="button"
              className="text-sm px-6 font-semibold py-3 bg-blue-400 text-white rounded-sm shadow-md hover:bg-blue-500"
              onClick={handleLogin}
              disabled={loginIsPending}
            >
              Log In
            </button>
          ) : (
            <button
              type="button"
              className="text-sm px-6 py-3 font-semibold bg-blue-400 text-white rounded-sm shadow-md hover:bg-blue-500"
              onClick={handleSendOTP}
              disabled={sendOTPIsPending}
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
