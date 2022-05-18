import { Request, Response } from "express";
import { Role } from "../types";

export const hasRole = (roles: Role[], allowSameUser = false) => {
  return (req: Request, res: Response, next: Function) => {
    const { uid, email, role } = res.locals;
    const { userId } = req.params;

    if (email === process.env.SUPER_USER) {
      return next();
    }

    if (allowSameUser && userId && userId === uid) {
      return next();
    }

    if (!role) {
      return res.status(403).send();
    }

    if (roles.includes(role)) {
      return next();
    }

    return res.status(403).send();
  };
};
