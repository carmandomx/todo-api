import { Request, Response } from "express";
import * as admin from "firebase-admin";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    
    res.statusCode = 401;
    return res.send({
      error: "No auth",
    });
    
  }

  if (!authorization.startsWith("Bearer")) {
    res.statusCode = 401;
    return res.send({
      error: "No auth",
    });
  }
  // "Bearer here's.my.JWToken"
  const splittedToken = authorization.split("Bearer ");
  if (splittedToken.length !== 2) {
    res.statusCode = 401;
    return res.send({
      error: "No auth",
    });
  }

  const token = splittedToken[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);
    res.locals = {
      ...res.locals,
      email: decodedToken.email,
      uid: decodedToken.uid,
      role: decodedToken.role,
    };

    return next();
  } catch (error) {
    console.error(error);
    res.statusCode = 401;
    return res.send({
      error: "No auth",
    });
  }
};
