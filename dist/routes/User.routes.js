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
exports.UserRouter = void 0;
const express_1 = require("express");
const methods_1 = require("../firebase/methods");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.UserRouter = (0, express_1.Router)();
// mnG9W8mVtQXIZZLrooQWlJibfv12
exports.UserRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password, role } = req.body;
    if (!displayName || !email || !password || !role) {
        return res.status(400).send({ error: "Missing fields" });
    }
    if (role === "admin" || role === "doctor") {
        return res.status(400).send({ error: "Invalid role" });
    }
    try {
        const userId = yield (0, methods_1.createUser)(displayName, email, password, role);
        res.status(201).send({
            userId,
        });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
// createDoctor - Authenticado y el rol debe ser admin
exports.UserRouter.get("/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield (0, methods_1.readUser)(userId);
        return res.status(200).send(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRouter.get("/", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, methods_1.getAllUsers)();
        res.status(200).send(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRouter.patch("/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { displayName } = req.body;
    if (!displayName) {
        return res.status(400).send({
            error: "no fields to update",
        });
    }
    try {
        const user = yield (0, methods_1.updateUser)(userId, displayName);
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRouter.delete("/:userId", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { disabled } = req.body;
    if (disabled === undefined || disabled === null) {
        return res.status(400).send({
            error: "no fields to update",
        });
    }
    try {
        const user = yield (0, methods_1.disableUser)(userId, disabled);
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
