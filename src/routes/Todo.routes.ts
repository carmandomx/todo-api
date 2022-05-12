import { Router, Request, Response } from "express";
import { createTodo } from "../repository/Todo.repo";
export const TodoRouter = Router();

TodoRouter.post("/", async (req: Request, res: Response) => {
  const { description } = req.body;
  const newTodoId = await createTodo(description);

  res.statusCode = 201;
  res.send({
    id: newTodoId,
  });
});
