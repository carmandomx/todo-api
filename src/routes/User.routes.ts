import { Router, Request, Response } from "express";
import {
  createUser,
  disableUser,
  getAllUsers,
  readUser,
  updateUser,
} from "../firebase/methods";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const UserRouter = Router();
// mnG9W8mVtQXIZZLrooQWlJibfv12
UserRouter.post("/", async (req: Request, res: Response) => {
  const { displayName, email, password, role } = req.body;

  if (!displayName || !email || !password || !role) {
    return res.status(400).send({ error: "Missing fields" });
  }

  if (role === "admin" || role === "doctor") {
    return res.status(400).send({ error: "Invalid role" });
  }

  try {
    const userId = await createUser(displayName, email, password, role);
    res.status(201).send({
      userId,
    });
  } catch (error) {
    res.status(500).send({ error: "something went wrong" });
  }
});

// createDoctor - Authenticado y el rol debe ser admin

UserRouter.get(
  "/:userId",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await readUser(userId);
      return res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "something went wrong" });
    }
  }
);

UserRouter.get(
  "/",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "something went wrong" });
    }
  }
);

UserRouter.patch(
  "/:userId",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { displayName } = req.body;

    if (!displayName) {
      return res.status(400).send({
        error: "no fields to update",
      });
    }

    try {
      const user = await updateUser(userId, displayName);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

UserRouter.delete(
  "/:userId",
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { disabled } = req.body;

    if (disabled === undefined || disabled === null) {
      return res.status(400).send({
        error: "no fields to update",
      });
    }

    try {
      const user = await disableUser(userId, disabled);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);
