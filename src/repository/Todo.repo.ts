import { Todo } from "../models/Todo.model";

// Create operation
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

// Read operation
export const fetchATodoById = async (todoId: number) => {
  let todo: Todo | null;
  try {
    todo = await Todo.findByPk(todoId);
    console.log(todo);
    if (todo === null) {
      // Null check
      return null;
    }

    return todo;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Update operation
export const updateTodoById = async (
  todoId: number,
  description: string,
  is_completed: boolean
) => {
  let todo = await fetchATodoById(todoId);

  if (todo === null) {
    return null; // Todo id is not valid
  }

  todo.set({
    description,
    is_completed,
  });

  console.log("Aqui va mi error:", todo.is_completed);

  todo = await todo.save();

  if (todo === null) {
    return null; // Error or null checks
  }

  return todo;
};

export const deleteTodoById = async (todoId: number) => {
  let todo = await fetchATodoById(todoId);

  if (todo === null) {
    throw new Error("Id not found");

    return null; // Todo id is not valid
  }

  return todo.destroy();
};
