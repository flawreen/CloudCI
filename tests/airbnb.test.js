import app from '../app.js';
import request from 'supertest';
import {describe, expect, test, it} from '@jest/globals';

describe('GET /airbnb/id', () => {
    it('return 200 and find id',  async () => {
        const res = await request(app).get('/airbnb/id/1003530');
        expect(res.status).toBe(200);

    });
});



