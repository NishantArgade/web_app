import jwt from "jsonwebtoken";

export const generateToken = (user, secret, expire) => {
  const { name, email, phone, status, role, _id } = user;

  return jwt.sign(
    {
      userID: _id,
      name,
      email,
      phone,
      status,
      role,
    },
    secret,
    { expiresIn: expire }
  );
};

export const cookiesOption = (tokenExpire) => ({
  maxAge: tokenExpire,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "noon" : "Strict",
});
