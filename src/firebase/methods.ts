import * as admin from "firebase-admin";
import { Role } from "../types";

// admin@test.com / test123
export const createUser = async (
  displayName: string,
  email: string,
  password: string,
  role: Role
) => {
  const { uid } = await admin.auth().createUser({
    displayName,
    email,
    password,
  });

  await admin.auth().setCustomUserClaims(uid, { role });

  return uid;
};

export const readUser = async (userId: string) => {
  const user = await admin.auth().getUser(userId);

  return user;
};

// export const getAllUsers = async () => {
//   const listAllMyUsers = admin.auth().listUsers(10);
//   const users = await admin.auth().getUsers(listAllMyUsers)
// }
