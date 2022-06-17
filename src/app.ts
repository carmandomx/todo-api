import express, { Application, Request, Response } from 'express';
import { TodoRouter } from "./routes/Todo.routes";
import { UserRouter } from "./routes/User.routes";
import { AdminRouter } from "./routes/Admin.routes";

const app: Application = express();

app.use(express.json());

app.use("/todos", TodoRouter);
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);

app.get("/", (req: Request, res: Response) => {
    res.send(req.originalUrl);
  });

export default app;