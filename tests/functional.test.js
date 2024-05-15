const request = require('supertest');
const functions = require('@google-cloud/functions-framework');
const app = require('../function');

describe('Functional Tests', () => {
    test('helloGET_success_status200', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('helloGET_success_payload', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Hello World!');
    });

    test('health_success_status204', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(204);
        expect(response.text).toBe('');
    });

    test('notFound_error_status404', async () => {
        const response = await request(app).get('/not-found');
        expect(response.statusCode).toBe(404);
    });

    test('notFound_error_payload', async () => {
        const response = await request(app).get('/not-found');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Not Found' });
    });

    test('forbidden_error_status403', async () => {
        const response = await request(app).get('/forbidden');
        expect(response.statusCode).toBe(403);
    });
});