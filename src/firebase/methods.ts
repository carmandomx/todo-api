import * as admin from "firebase-admin";
import { Role } from "../types";

// admin@test.com / test123

interface User {
  uid: string;
  email: string;
  userName: string;
  role: Role;
  isDisabled: boolean;
}

const mapToUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: "" }) as { role?: string };
  const role = customClaims.role ? customClaims.role : "";

  return {
    uid: user.uid,
    email: user.email,
    userName: user.displayName,
    role,
    isDisabled: user.disabled,
  };
};

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

  // Guardar a Postgresql -> Como van a manejar si esto falla?

  return uid;
};

// UserProfileModule -> CRU
// MedicalHistoryModule -> CRU
// ContactInfoModule -> CRU

export const readUser = async (userId: string) => {
  const user = await admin.auth().getUser(userId);

  return mapToUser(user);
};

export const getAllUsers = async () => {
  const listAllMyUsers = await admin.auth().listUsers(10);
  const users = listAllMyUsers.users.map(mapToUser);

  return users;
};
