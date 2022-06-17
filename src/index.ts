import app from './app';
import dotenv from "dotenv";
import { startSequelize } from "./models";

import * as admin from "firebase-admin";

dotenv.config();

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp();


const port = process.env.PORT;
const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_host = <string>process.env.DB_HOSTNAME;



app.listen(port, async () => {
  try {
    let db = startSequelize(db_name, db_password, db_host, db_username);

    await db.sync();
    console.log("Up and running!!!");
  } catch (error) {
    console.error(error);
    process.abort();
  }
});
