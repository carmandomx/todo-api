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
