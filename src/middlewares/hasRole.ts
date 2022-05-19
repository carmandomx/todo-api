import { Request, Response } from "express";
import { Role } from "../types";
// isAuthorized

interface Appointment {
  patient_id: string; // Referencia a un usuario en Firebase con el rol de Patient
  doctor_id: string; // Referencia a un usuario en FB con rol Doctor
}

// if role === 'doctor';
// SELECT * FROM appoitnments WHERE doctor_id = myUserId
// if role === 'patient';
// SELECT * FROM appointments WHERE patient_id = myUserId
// if role === 'admin';
// Filtros como query_params

// Users -> role -> permisos

export const hasRole = (options: { roles: Role[]; allowSameUser: boolean }) => {
  return (req: Request, res: Response, next: Function) => {
    const { uid, email, role } = res.locals;
    const { userId } = req.params;

    if (email === process.env.SUPER_USER) {
      return next();
    }

    if (options.allowSameUser && userId && userId === uid) {
      return next();
    }

    if (!role) {
      return res.status(403).send();
    }

    if (options.roles.includes(role)) {
      return next();
    }

    return res.status(403).send();
  };
};
