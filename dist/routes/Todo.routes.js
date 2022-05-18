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
exports.TodoRouter = void 0;
const express_1 = require("express");
const Todo_repo_1 = require("../repository/Todo.repo");
exports.TodoRouter = (0, express_1.Router)();
exports.TodoRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description } = req.body;
    const newTodoId = yield (0, Todo_repo_1.createTodo)(description);
    res.statusCode = 201;
    res.send({
        id: newTodoId,
    });
}));
exports.TodoRouter.get("/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = parseInt(req.params["todoId"], 10);
    if (todoId <= 0) {
        res.statusCode = 400;
        return res.send({
            error: "Invalid id",
        });
    }
    const todo = yield (0, Todo_repo_1.fetchATodoById)(todoId);
    if (todo === null) {
        res.statusCode = 404;
        return res.send({
            error: "Todo not found",
        });
    }
    // Code here todo will be valid information!
    res.statusCode = 200;
    return res.send(todo.toJSON());
}));
exports.TodoRouter.put("/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const todo = yield (0, Todo_repo_1.updateTodoById)(todoId, description, is_completed);
    if (todo === null) {
        res.statusCode = 400;
        return res.send({
            error: "Something went wrong",
        });
    }
    res.statusCode = 200;
    return res.send(todo.toJSON());
}));
exports.TodoRouter.delete("/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = parseInt(req.params["todoId"], 10);
    if (todoId <= 0) {
        res.statusCode = 400;
        return res.send({
            error: "Invalid id",
        });
    }
    try {
        yield (0, Todo_repo_1.deleteTodoById)(todoId);
        res.statusCode = 204;
        return res.send();
    }
    catch (error) {
        res.statusCode = 400;
        return res.send({
            error: "Something went wrong!",
        });
    }
}));
