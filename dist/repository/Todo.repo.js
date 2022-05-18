"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.updateTodoById = exports.fetchATodoById = exports.createTodo = void 0;
const Todo_model_1 = require("../models/Todo.model");
// Create operation
const createTodo = (description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = yield Todo_model_1.Todo.create({
            description,
        });
        console.log(newTodo.id);
        return newTodo.id;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createTodo = createTodo;
// Read operation
const fetchATodoById = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    let todo;
    try {
        todo = yield Todo_model_1.Todo.findByPk(todoId);
        console.log(todo);
        if (todo === null) {
            // Null check
            return null;
        }
        return todo;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchATodoById = fetchATodoById;
// Update operation
const updateTodoById = (todoId, description, is_completed) => __awaiter(void 0, void 0, void 0, function* () {
    let todo = yield (0, exports.fetchATodoById)(todoId);
    if (todo === null) {
        return null; // Todo id is not valid
    }
    todo.set({
        description,
        is_completed,
    });
    console.log("Aqui va mi error:", todo.is_completed);
    todo = yield todo.save();
    if (todo === null) {
        return null; // Error or null checks
    }
    return todo;
});
exports.updateTodoById = updateTodoById;
const deleteTodoById = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    let todo = yield (0, exports.fetchATodoById)(todoId);
    if (todo === null) {
        throw new Error("Id not found");
        return null; // Todo id is not valid
    }
    return todo.destroy();
});
exports.deleteTodoById = deleteTodoById;
