import React from "react";
import { Link } from "react-router-dom";
import { PasswordInput, PinInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const Signup = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      status: "",
      assigned_RM: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) =>
        value.length > 3 ? null : "Name should be at least 3 characters",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      phone: (value) =>
        value.length > 10
          ? null
          : "Phone number should be at least 10 characters",
      password: (value) =>
        value.length > 6 ? null : "Password should be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  function handleSubmit(values) {
    console.log(values);
  }
  return (
    <div className="w-9/12 mx-auto">
      <div className="mb-8">
        <p className="text-2xl font-medium">Sign Up</p>
        <p className="text-sm mt-2 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Log in
          </Link>
        </p>
      </div>

      <form className="flex flex-col gap-y-2">
        <TextInput
          withAsterisk
          label="Name"
          placeholder="jon"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Phone"
          placeholder="1234567890"
          {...form.getInputProps("phone")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="******"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          label="Re-Enter Password"
          placeholder="******"
          {...form.getInputProps("confirmPassword")}
        />

        <div className="flex items-center justify-between  mt-8">
          <button
            type="button"
            className="text-sm font-semibold px-6 py-3 bg-blue-400 text-white rounded-sm shadow-md hover:bg-blue-500"
            onClick={form.onSubmit(handleSubmit)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
