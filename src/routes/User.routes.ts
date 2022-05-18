import { Router, Request, Response } from "express";
import { createUser, readUser } from "../firebase/methods";
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

UserRouter.get(
  "/:userId",
  isAuthenticated,
  hasRole(["admin"], true),
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
