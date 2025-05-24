import { Router } from "express";
import {
  getTeachers,
  getTeacher,
  addTeacher,
  editTeacher,
  removeTeacher,
} from "../controllers/teachers.controller.js";

const router = Router();

router.get("/teachers", getTeachers);
router.get("/teacher", getTeacher);
router.post("/teachers", addTeacher);
router.put("/teachers", editTeacher);
router.delete("/teachers", removeTeacher);

export default router;
