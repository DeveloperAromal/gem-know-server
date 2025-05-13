import { Router } from "express";
import { fetchAbsentees } from "../controllers/absentee.controller.js";

const router = Router();

router.get("/absentees", fetchAbsentees);

export default router;
