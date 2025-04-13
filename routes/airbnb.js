import express from 'express';
import db from '../db/connection.js';
import dotenv from 'dotenv';

dotenv.config();

// TODO query de pe airbnb care ia proprietatile cu media de la review_scores peste 8.5 pentru "family-safe"
//  si peste 6 pentru "friends trip"

// TODO vad daca de la location-coordinates e in raza de {x} km

// TODO query sa ia proprietati cu valabilitate in urmatoarea luna x zile


const router = express.Router();

async function getCollection() {
    return db.collection(process.env.COLLECTION_NAME);
}

router.get('/ping', (req, res) => {
    res.send('Pong from Airbnb router!');
});

router.get('/id/:id', async (req, res) => {
    const collection = await db.collection(process.env.COLLECTION_NAME);
    const qry = await collection.findOne({_id: req.params.id.toString()});
    res.send(qry);
});

router.get('/bookings-top10/:location', async (req, res) => {
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


export default router;
