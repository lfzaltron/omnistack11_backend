const request = require('supertest');
const app = require('../../src/app');
const dbConnection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await dbConnection.migrate.rollback();
        await dbConnection.migrate.latest();
    });

    afterAll(async () => {
        await dbConnection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: 'APAE',
                email: 'portoalegre@apae.com.br',
                whatsapp: '0005500000',
                city: 'Porto Alegre',
                uf: 'RS'
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should not create ONG without name', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                email: 'email@nothing.com',
                whatsapp: '55999999999',
                city: 'cidade',
                uf: 'uf'
            });

        expect(response.status).toBe(400);
        expect(response.error.status).toBe(400);
    });

    it('should not create ONG without email', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: 'ong name',
                whatsapp: '55999999999',
                city: 'cidade',
                uf: 'uf'
            });

        expect(response.status).toBe(400);
        expect(response.error.status).toBe(400);
    });

    it('should not create ONG without whatsapp', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: 'ong name',
                email: 'email@nothing.com',
                city: 'cidade',
                uf: 'uf'
            });

        expect(response.status).toBe(400);
        expect(response.error.status).toBe(400);
    });

    it('should not create ONG without city', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: 'ong name',
                email: 'email@nothing.com',
                whatsapp: '55999999999',
                uf: 'uf'
            });

        expect(response.status).toBe(400);
        expect(response.error.status).toBe(400);
    });

    it('should not create ONG without uf', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: 'ong name',
                email: 'email@nothing.com',
                whatsapp: '55999999999',
                city: 'cidade'
            });

        expect(response.status).toBe(400);
        expect(response.error.status).toBe(400);
    });
});
