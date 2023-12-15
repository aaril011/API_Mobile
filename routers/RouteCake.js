import express from "express";
import { getCake, createCake, uploads } from "../controllers/CakeControllers.js";

const router = express.Router();

router.get("/", getCake);
router.post("/", uploads.single("file"), createCake);

export default router;
