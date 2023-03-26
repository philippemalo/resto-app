import { Router } from "express";
import authRouter from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "MVC-Template server" });
});

router.use("/auth", authRouter);

export default router;
