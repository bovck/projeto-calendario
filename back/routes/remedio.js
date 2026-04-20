import express from "express";
import isAuth from "../middleware/is-auth.js";

import {
  postRemedio,
  getRemedios,
  updateRemedio,
  deleteRemedio,
} from "../controllers/remedio.js";

const remedioRouter = express.Router();

remedioRouter.get("/index", isAuth, getRemedios);

remedioRouter.post("/index", isAuth, postRemedio);

remedioRouter.put("/index/:remedioId", isAuth, updateRemedio);

remedioRouter.delete("/index/:remedioId", isAuth, deleteRemedio);

export default remedioRouter;
