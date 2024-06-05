import {
  createUserHandler,
  getUserByIdHandler,
  searchUserHandler,
} from "../controllers";

import { Router } from "express";

const router = Router();

router.post("/users", createUserHandler);
router.get("/users/:userId", getUserByIdHandler);
router.post("/users/search", searchUserHandler);

export default router;
