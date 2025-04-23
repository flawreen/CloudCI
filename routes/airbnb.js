import express from 'express';
import { connectToDb } from '../db/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/ping', (req, res) => {
    res.send('Pong from Airbnb router!');
});

router.get('/id/:id', async (req, res) => {
    const db = await connectToDb();
    const collection = await db.collection(process.env.COLLECTION_NAME);
    const qry = await collection.findOne({_id: req.params.id.toString()});

    if (!qry) {
        res.sendStatus(404);
    } else res.send(qry);
});

router.get('/best-by-location/:location', async (req, res) => {
    const db = await connectToDb();
    const collection = await db.collection(process.env.COLLECTION_NAME);
    // convert %20 into spaces
    req.params.location.replaceAll('%20', ' ');
    let top10 = [];
    for (let i = 1; ; ++i) {
        let bookings = await collection
            .find({'address.market': req.params.location})
            .project({review_scores: 1})
            .limit(5)
            .skip((i - 1) * 5).toArray();

        for (const booking of bookings) {
            // calculating average review score
            let scores_no = Object.keys(booking.review_scores).length - 1;
            let scores_sum = 0;
            let scores_array = Object.values(booking.review_scores);
            for (let k = 0; k < scores_no; ++k) {
                scores_sum += scores_array[k];
            }
            const avg_score = scores_sum / scores_no;

            // calculating the recommendation grade
            let recommendation;
            if (avg_score > 6) {
                recommendation = "Friends trip";
                if (avg_score > 9) {
                    recommendation = "Family trip";
                }
            } else continue;

            top10.push(
                {
                    _id: booking._id,
                    location: req.params.location,
                    recommendation: recommendation,
                    avg_score: avg_score.toFixed(2)
                }
            );
        }
        if (top10.length >= 10) {
            break;
        }
    }

    res.send(top10);
});

router.get('/with-facility/:facility', async (req, res) => {
    const db = await connectToDb();
    const collection = await db.collection(process.env.COLLECTION_NAME);
    req.params.facility.replaceAll('%20', ' ');
    let top10 = await collection
        .find(
        {'amenities': req.params.facility}
        )
        .limit(10)
        .toArray();

    res.send(top10);
});


export default router;
