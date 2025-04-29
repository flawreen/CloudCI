import request from 'supertest';
import express from 'express';
import router from '../routes/airbnb.js'; // adjust path as needed
import {connectToDb} from '../db/connection.js';
import {ObjectId} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Mock the database connection and collection
jest.mock('../db/connection.js', () => ({
    connectToDb: jest.fn()
}));

const app = express();
app.use('/airbnb', router);

describe('GET /airbnb/id', () => {
    const mockCollection = {
        findOne: jest.fn()
    };

    beforeEach(() => {
        connectToDb.mockResolvedValue({
            collection: jest.fn().mockReturnValue(mockCollection)
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('return 200 and find the correct id', async () => {
        const mockBooking = {
            _id: '1003530',
            name: 'Test Booking'
        };
        mockCollection.findOne.mockResolvedValue(mockBooking);

        const res = await request(app)
            .get('/airbnb/id/1003530')
            .expect(200);

        expect(res.body).toEqual(mockBooking);
        expect(mockCollection.findOne).toHaveBeenCalledWith({_id: '1003530'});
    });

    it('return 404', async () => {
        mockCollection.findOne.mockResolvedValue(null);

        await request(app)
            .get('/airbnb/id/nonexistent')
            .expect(404);

        expect(mockCollection.findOne).toHaveBeenCalledWith({_id: 'nonexistent'});
    });
});

describe('GET /airbnb/with-facility', () => {
    const mockCollection = {
        find: jest.fn().mockReturnThis(),
        project: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        toArray: jest.fn()
    };

    beforeEach(() => {
        connectToDb.mockResolvedValue({
            collection: jest.fn().mockReturnValue(mockCollection)
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('return 200 and find at most 10 bookings with the correct facility', async () => {
        const mockBookings = [
            {_id: '1', amenities: ['TV', 'WiFi']},
            {_id: '2', amenities: ['TV', 'Kitchen']}
        ];
        mockCollection.toArray.mockResolvedValue(mockBookings);

        const res = await request(app)
            .get('/airbnb/with-facility/TV')
            .expect(200);

        expect(res.body).toEqual(mockBookings);
        expect(mockCollection.find).toHaveBeenCalledWith({amenities: 'TV'});
        expect(mockCollection.project).toHaveBeenCalledWith({_id: 1, amenities: 1});
        expect(mockCollection.limit).toHaveBeenCalledWith(10);
    });

    it('return 404', async () => {
        mockCollection.toArray.mockResolvedValue([]);

        await request(app)
            .get('/airbnb/with-facility/nonexistent')
            .expect(404);

        expect(mockCollection.find).toHaveBeenCalledWith({amenities: 'nonexistent'});
    });
});

describe('GET /airbnb/best-by-location', () => {
    const mockCollection = {
        find: jest.fn().mockReturnThis(),
        project: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        toArray: jest.fn()
    };

    beforeEach(() => {
        connectToDb.mockResolvedValue({
            collection: jest.fn().mockReturnValue(mockCollection)
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('return 200 and find at most 10 bookings in the requested city ranked by review scores average', async () => {
        const mockBookings = [
            {
                _id: '1',
                review_scores: {a: 10, b: 9, c: 9, d: 10, e: 10, overall: 9.6},
                address: {market: 'New York'}
            },
            {
                _id: '2',
                review_scores: {a: 7, b: 8, c: 7, d: 8, e: 7, overall: 7.4},
                address: {market: 'New York'}
            }
        ];

        mockCollection.toArray.mockResolvedValueOnce(mockBookings);

        const res = await request(app)
            .get('/airbnb/best-by-location/New%20York')
            .expect(200);

        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('recommendation');
        expect(res.body[0].avg_score).toBeDefined();
        expect(mockCollection.find).toHaveBeenCalledWith({'address.market': 'New York'});
    });

    it('return 404', async () => {
        mockCollection.toArray.mockResolvedValueOnce([]);

        await request(app)
            .get('/airbnb/best-by-location/Nonexistent')
            .expect(404);
    });
});