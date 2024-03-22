import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { cookiesOption } from "../helper.js";

export const protect = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode?.userID);
    next();
  } catch (error) {
    res.cookie("token", "", cookiesOption(0));

    return res.status(401).json({ message: "Not authorized" });
  }
};

export const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Not authorized" });
    else next();
  };
};
