import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import remedioRouter from "./routes/remedio.js";

const MONGODB_URI =
  "mongodb+srv://gustavo:mT54I90oiy1RmHWL@cluster0.3kejlhd.mongodb.net/farmacia?appName=Cluster0";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

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

try {
  const result = await mongoose.connect(MONGODB_URI);
  if (result) {
    app.listen(8080);
  }
} catch (err) {
  console.log(err);
}
