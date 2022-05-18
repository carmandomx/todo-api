import { Router, Request, Response } from "express";
import {
  createTodo,
  deleteTodoById,
  fetchATodoById,
  updateTodoById,
} from "../repository/Todo.repo";
export const TodoRouter = Router();

TodoRouter.post("/", async (req: Request, res: Response) => {
  const { description } = req.body;
  const newTodoId = await createTodo(description);

  res.statusCode = 201;
  res.send({
    id: newTodoId,
  });
});

TodoRouter.get("/:todoId", async (req: Request, res: Response) => {
  const todoId = parseInt(req.params["todoId"], 10);

  if (todoId <= 0) {
    res.statusCode = 400;
    return res.send({
      error: "Invalid id",
    });
  }

  const todo = await fetchATodoById(todoId);

  if (todo === null) {
    res.statusCode = 404;
    return res.send({
      error: "Todo not found",
    });
  }

  // Code here todo will be valid information!
  res.statusCode = 200;
  return res.send(todo.toJSON());
});

TodoRouter.put("/:todoId", async (req: Request, res: Response) => {
  const todoId = parseInt(req.params["todoId"], 10);

  if (todoId <= 0) {
    res.statusCode = 400;
    return res.send({
      error: "Invalid id",
    });
  }

  const { description, is_completed } = req.body;

  if (typeof description != "string") {
    res.statusCode = 400;
    return res.send({
      error: "Invalid description",
    });
  }

  if (typeof is_completed != "boolean") {
    res.statusCode = 400;
    return res.send({
      error: "Invalid is_completed",
    });
  }

  const todo = await updateTodoById(
    todoId,
    description as string,
    is_completed as boolean
  );
  if (todo === null) {
    res.statusCode = 400;
    return res.send({
      error: "Something went wrong",
    });
  }

  res.statusCode = 200;
  return res.send(todo.toJSON());
});

TodoRouter.delete("/:todoId", async (req: Request, res: Response) => {
  const todoId = parseInt(req.params["todoId"], 10);

  if (todoId <= 0) {
    res.statusCode = 400;
    return res.send({
      error: "Invalid id",
    });
  }

  try {
    await deleteTodoById(todoId);
    res.statusCode = 204;
    return res.send();
  } catch (error) {
    res.statusCode = 400;
    return res.send({
      error: "Something went wrong!",
    });
  }
});
