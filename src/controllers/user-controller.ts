import { Request, Response } from "express";
import { createUser, getUserById, indexUser, searchUser } from "../services";
import UserModel from "models/user-model";

export async function createUserHandler(
  req: Request,
  res: Response
): Promise<void> {
  const user: UserModel = req.body;
  try {
    const userId = await createUser(user);
    await indexUser(userId, user);
    res.status(201).json({ message: "User created", userId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the user", error });
  }
}

export async function getUserByIdHandler(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.params.userId;
  try {
    const user = await getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while getting the user", error });
  }
}

export async function searchUserHandler(
  req: Request,
  res: Response
): Promise<void> {
  const query = req.body;
  try {
    const results = await searchUser(query);
    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while searching the user", error });
  }
}
