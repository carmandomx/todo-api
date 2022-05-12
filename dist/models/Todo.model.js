"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTodoModel = exports.Todo = void 0;
const sequelize_1 = require("sequelize");
class Todo extends sequelize_1.Model {
}
exports.Todo = Todo;
const initTodoModel = (sequelize) => {
    Todo.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: sequelize_1.DataTypes.STRING,
        is_completed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize, // Instance of sequelize that reflects a connection
    });
};
exports.initTodoModel = initTodoModel;
