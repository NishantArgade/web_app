import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("connection with db established"))
    .catch((err) => console.log("error in db connection", err));
};
