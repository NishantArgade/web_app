import { axiosCall } from "./helper";

export const login = async (payload) => {
  return await axiosCall("post", "/auth/login", payload);
};
export const signup = async (payload) => {
  return await axiosCall("post", "/auth/signup", payload);
};
export const logout = async () => {
  return await axiosCall("get", "/auth/logout");
};
export const getAllUsers = async () => {
  return await axiosCall("get", "/auth/allUsers");
};
export const sendOTPMail = async (payload) => {
  return await axiosCall("post", "/auth/sendOTP", payload);
};
export const checkAuth = async () => {
  return await axiosCall("get", "/auth/checkAuth");
};
