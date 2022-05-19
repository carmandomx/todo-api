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
exports.AdminRouter = void 0;
const express_1 = require("express");
const methods_1 = require("../firebase/methods");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.AdminRouter = (0, express_1.Router)();
// Ruta para el paciente de los appointments
// roles = ['doctor', 'admin']
// PatientRouter -> esta protegido por todos los middlewares
// DoctorRouter -> se va repetir un poco de codigo???
exports.AdminRouter.post("/createAdmin", isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: [],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password, role } = req.body;
    if (!displayName || !email || !password || !role) {
        return res.status(400).send({ error: "Missing fields" });
    }
    if (role !== "admin") {
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
