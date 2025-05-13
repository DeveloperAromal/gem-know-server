import { Router } from "express";
import {
  getUsers,
  getUser,
  addUser,
  editUser,
  removeUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/user", getUser);
router.post("/user", addUser);
router.put("/user", editUser);
router.delete("/user", removeUser);

export default router;
