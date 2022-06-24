import app from '../../app';
import { startSequelize } from '../../models';
import { Sequelize } from 'sequelize/types';
import dotenv from 'dotenv';
import request from 'supertest';

dotenv.config();

const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password= <string>process.env.DB_PASSWORD;
const db_host = <string>process.env.DB_HOSTNAME;


describe('Todos routes', () => {
    let testDB: Sequelize;
    beforeAll(async () => {
        testDB = startSequelize(db_name, db_password, db_host, db_username)
        

        await testDB.sync({ force: true })

    })


    afterAll(async() => {

        await testDB.close();
    })

    it('[POST] /todos - should return 201 after created', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ description: 'Unit test' })


        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1
        })
    })

    it('[POST] /todos - should return 400 after receiving incorrect body', async () => {
        const res = await request(app)
            .post('/todos')
            .send({})

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: 'No description'
        })
    })

    it('[GET] /todos/:todoId - should return 200',async () => {
        const res = await request(app)
            .get('/todos/1')
            

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('description', 'Unit test');
        expect(res.body).toHaveProperty('is_completed', false);
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');

    } )


    it('[GET] /todos/:todoId - should return 400 at invalidId', async () => {
        const res = await request(app)
            .get('/todos/-5')

        expect(res.statusCode).toEqual(400)
        expect(res.body).toEqual({
            error: 'Invalid id'
        })
    })

    it('[GET] /todos/:id - should return 404 when no todo is found',async () => {
        const res = await request(app)
            .get('/todos/100')

        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({
            error: 'Todo not found'
        })
    })
})