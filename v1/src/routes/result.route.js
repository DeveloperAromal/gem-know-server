import { Router } from "express";
import { fetchResult, verifyResult } from "../controllers/result.controller.js";

const router = Router();

router.get("/result", fetchResult);
router.put("/result", verifyResult);

export default router;
