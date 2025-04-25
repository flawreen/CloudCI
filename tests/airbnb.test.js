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

        expect(bookings.length).toBeLessThanOrEqual(10);

        for (const booking of bookings) {
            expect(booking.amenities).toContain('Washer');
        }
    });
    it('return 404', async () => {
        const res = await request(app).get('/airbnb/with-facility/Golf land');
        expect(res.status).toBe(404);
    });
});

describe('GET /airbnb/best-by-location', () => {
    const timeout = 5000;
    it('return 200 and find at most 10 bookings in the requested city ranked by review scores average: above 6 for friends trip, above 9 for family trip', async () => {
        const res = await request(app).get('/airbnb/best-by-location/New York');
        expect(res.status).toBe(200);
        const bookings = res.body;
        expect(bookings.length).toBeLessThanOrEqual(10);

        for (const booking of bookings) {
            expect(booking.location).toBe('New York');
            expect(Number.parseFloat(booking.avg_score)).toBeGreaterThanOrEqual(6);
            if (Number.parseFloat(booking.avg_score) > 9) {
                expect(booking.recommendation).toBe('Family trip');
            } else {
                expect(booking.recommendation).toBe('Friends trip');
            }
        }
    }, timeout);
    it('return 404', async () => {
        const res = await request(app).get('/airbnb/best-by-location/Narnia');
        expect(res.status).toBe(404);
    }, timeout);
});

afterAll(async () => {
    await closeDbConnection();
})



