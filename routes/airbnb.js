import express from 'express';
import {connectToDb} from '../db/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/ping', (req, res) => {
    res.send('Pong from Airbnb router!');
});

/**
 * Finds a booking by id
 */
router.get('/id/:id', async (req, res) => {
    const db = await connectToDb();
    const collection = await db.collection(process.env.COLLECTION_NAME);
    const qry = await collection.findOne({_id: req.params.id.toString()});

    if (!qry) {
        res.sendStatus(404);
    } else res.send(qry);
});

/**
 *  Finds at most 10 bookings in the requested city having the review scores average above:
 -> 6 to be recommended for a friends trip
 -> 9 to be recommended for a family trip
 */
router.get('/best-by-location/:location', async (req, res) => {
    const db = await connectToDb();
    const collection = await db.collection(process.env.COLLECTION_NAME);
    // convert %20 into spaces
    req.params.location.replaceAll('%20', ' ');

    let top10 = [];
    for (let i = 1; top10.length < 10; ++i) {
        let bookings = await collection
            .find({'address.market': req.params.location})
            .project({review_scores: 1})
            .limit(10)
            .skip((i - 1) * 10).toArray();

        if (bookings.length < 1) {
            res.sendStatus(404);
            return;
        }

        for (const booking of bookings) {
            const avg_score = Object
                .values(booking.review_scores)
                .slice(0, -1)
                .reduce((sum, score) => sum + score, 0) / (Object.keys(booking.review_scores).length - 1);

            // calculating the recommendation grade
            let recommendation;
            if (avg_score > 6) {
                recommendation = avg_score > 9 ? "Family trip" : "Friends trip";
            } else continue;


            if (top10.length >= 10) {
                break;
            } else top10.push({
                _id: booking._id,
                location: req.params.location,
                recommendation: recommendation,
                avg_score: avg_score.toFixed(2)
            });
        }
    }

    if (top10.length < 1) {
        res.sendStatus(404);
    } else res.send(top10);
});

/**
 * Finds at most 10 bookings with the requested facility
 */
router.get('/with-facility/:facility', async (req, res) => {
    const db = await connectToDb();
    const collection = await db.collection(process.env.COLLECTION_NAME);
    req.params.facility.replaceAll('%20', ' ');
    let top10 = await collection
        .find({'amenities': req.params.facility})
        .limit(10)
        .toArray();

    if (top10.length < 1) {
        res.sendStatus(404);
    } else res.send(top10);
});


export default router;
