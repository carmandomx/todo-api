import app from '../../app';
import { sequelize, startSequelize } from '../../models/index'
import request from 'supertest';
import { Sequelize } from 'sequelize/types';
import dotenv from 'dotenv';

dotenv.config();
const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_host = <string>process.env.DB_HOSTNAME;
describe('Todos Router', () => {
    let testDb: Sequelize;

    beforeAll(async () => {

       testDb = startSequelize(db_name, db_password, db_host, db_username);
        await testDb.sync({force: true});
    })

    afterAll(async () => {
        await testDb.close();
    })

    it('returns 200', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ description: "Prueba" })

        // console.log(res.statusCode);
        expect(res.statusCode).toEqual(201)


    })


})