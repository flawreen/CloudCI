import app from '../app.js';
import request from 'supertest';
import {describe, expect, test, it, afterAll} from '@jest/globals';
import {closeDbConnection} from "../db/connection.js";

describe('GET /airbnb/id', () => {
    it('return 200 and find the correct id', async () => {
        const res = await request(app).get('/airbnb/id/1003530');
        expect(res.status).toBe(200);
        expect(res.body._id).toBe('1003530');
    });
});

describe('GET /airbnb/id', () => {
    it('return 404', async () => {
        const res = await request(app).get('/airbnb/id/no_id');
        expect(res.status).toBe(404);
    });
});

describe('GET /airbnb/with-facility', () => {
    it('return 200 and find at most 10 bookings with the correct facility', async () => {
        const res = await request(app).get('/airbnb/with-facility/Washer');
        expect(res.status).toBe(200);
        const bookings = res.body;
        for (const booking of bookings) {
            expect(booking.amenities).toContain('Washer');
        }
        expect(bookings.length).toBeLessThanOrEqual(10);
    });
});

describe('GET /airbnb/with-facility', () => {
    it('return 404', async () => {
        const res = await request(app).get('/airbnb/with-facility/Golf land');
        expect(res.status).toBe(404);
    });
});


afterAll(async () => {
    await closeDbConnection();
})



