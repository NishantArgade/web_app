import express from "express";
const app = express();
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import { dbConnection } from "./conn.js";

const PORT = process.env.PORT || 6000;
dbConnection();

app.use(express.json());
app.use(cookieParser());
const corsConfig = {
  origin: "",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

app.use("/auth", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
