import { cookiesOption, generateToken } from "../helper.js";
import { OTP } from "../models/otpModel.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../sendMail.js";

export async function login(req, res) {
  const { email, password, otp } = req.body;
  try {
    if (email && password && !otp) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }

      const token = generateToken(
        user,
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRY * 60
      );

      res.cookie(
        "token",
        token,
        cookiesOption(process.env.JWT_EXPIRY * 60 * 1000)
      );

      return res.status(200).json({ token });
    } else {
      // Implement OTP logic here
      const user = await OTP.findOne({ email });
      if (user && user.otp === otp && user.otp_expiry > new Date()) {
        const token = generateToken(
          user,
          process.env.JWT_SECRET,
          process.env.JWT_EXPIRY * 60
        );

        res.cookie(
          "token",
          token,
          cookiesOption(process.env.JWT_EXPIRY * 60 * 1000)
        );
        return res.status(200).json({ token });
      } else {
        return res
          .status(401)
          .json({ message: "Incorrect OTP or has expired" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function singup(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      ...req.body,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created", data: newUser });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("token", "", cookiesOption(0));
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Fetched All Users", users });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function checkAuth(req, res) {
  try {
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode?.userID);
    res.status(200).json({ message: "Authorized", user: req.user });
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
}
export async function sendOTP(req, res) {
  try {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otp_expiry = new Date(new Date().getTime() + 15 * 60 * 1000);
    await sendMail(email, otp);
    await OTP.findOneAndUpdate(
      { email },
      {
        otp,
        otp_expiry,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "OTP Sent" });
  } catch (error) {
    return res.status(401).json({ message: "Could not sent otp" });
  }
}
