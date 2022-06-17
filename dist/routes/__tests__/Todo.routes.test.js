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
const app_1 = __importDefault(require("../../app"));
const index_1 = require("../../models/index");
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOSTNAME;
describe('Todos Router', () => {
    let testDb;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        testDb = (0, index_1.startSequelize)(db_name, db_password, db_host, db_username);
        yield testDb.sync({ force: true });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testDb.close();
    }));
    it('returns 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/todos')
            .send({ description: "Prueba" });
        // console.log(res.statusCode);
        expect(res.statusCode).toEqual(201);
    }));
});
