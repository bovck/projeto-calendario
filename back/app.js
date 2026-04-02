import express from "express";
import mongoose from "mongoose";

import MONGODB_URI from "./help.js";
import remedioRouter from "./routes/remedio.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(remedioRouter);
app.use(authRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const errorData = error.data;
  res.status(status).json({ message: message, errorData: errorData });
});

try {
  const result = await mongoose.connect(MONGODB_URI);
  if (result) {
    app.listen(8080);
  }
} catch (err) {
  console.log(err);
}
