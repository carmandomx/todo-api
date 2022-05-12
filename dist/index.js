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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const Todo_routes_1 = require("./routes/Todo.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOSTNAME;
// Middlewares //
app.use(express_1.default.json());
// Routes //
app.use("/todos", Todo_routes_1.TodoRouter);
app.get("/", (req, res) => {
    res.send(req.originalUrl);
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, models_1.startSequelize)(db_name, db_password, db_host, db_username);
        console.log("Up and running!!!");
    }
    catch (error) {
        console.error(error);
        process.abort();
    }
}));
