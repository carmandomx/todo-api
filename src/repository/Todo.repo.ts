import { Todo } from "../models/Todo.model";

export const createTodo = async (description: string) => {
  try {
    const newTodo = await Todo.create({
      description,
    });
    console.log(newTodo.id);
    return newTodo.id;
  } catch (error) {
    console.error(error);
  }
};
