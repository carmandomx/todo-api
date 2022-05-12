import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { startSequelize } from "./models";
import { TodoRouter } from "./routes/Todo.routes";
dotenv.config();

const app = express();

const port = process.env.PORT;
const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_host = <string>process.env.DB_HOSTNAME;

// Middlewares //

app.use(express.json());

// Routes //
app.use("/todos", TodoRouter);

app.get("/", (req: Request, res: Response) => {
  res.send(req.originalUrl);
});

app.listen(port, async () => {
  try {
    startSequelize(db_name, db_password, db_host, db_username);
    console.log("Up and running!!!");
  } catch (error) {
    console.error(error);
    process.abort();
  }
});
