import express from "express";
import {
  postRemedio,
  getRemedios,
  updateRemedio,
} from "../controllers/remedio.js";

const remedioRouter = express.Router();

remedioRouter.get("/index", getRemedios);

remedioRouter.post("/index", postRemedio);

remedioRouter.put("/index/:remedioId", updateRemedio);

export default remedioRouter;
