import { Router, Request, Response } from "express";
import { createUser, readUser } from "../firebase/methods";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const AdminRouter = Router();

// Ruta para el paciente de los appointments
// roles = ['doctor', 'admin']

// PatientRouter -> esta protegido por todos los middlewares
// DoctorRouter -> se va repetir un poco de codigo???

AdminRouter.post(
  "/createAdmin",
  isAuthenticated,
  hasRole({
    roles: [], // ['patient', 'doctor', 'admin']
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    const { displayName, email, password, role } = req.body;

    if (!displayName || !email || !password || !role) {
      return res.status(400).send({ error: "Missing fields" });
    }

    if (role !== "admin") {
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
  }
);
