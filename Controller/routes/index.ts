import { Router } from "express";
import authRouter from "./auth";
import menuRouter from "./menu";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Resto-app Server is running!" });
});

router.use("/auth", authRouter);

router.use("/menu", menuRouter);

export default router;
