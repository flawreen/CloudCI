import express from 'express';
import db from '../db/connection.js';

// TODO query de pe airbnb care ia proprietatile cu media de la review_scores peste 8.5 pentru "family-safe"
//  si peste 6 pentru "friends trip"

// TODO vad daca de la location-coordinates e in raza de {x} km

// TODO query sa ia proprietatile cu valabilitate in urmatoarea luna x zile


const router = express.Router();
router.get('/ping', (req, res) => {
    res.send('Pong from Airbnb router!');
});
// router.get('/:id', async function (req, res) {
//     const qry = await collection.findOne({_id: req.params.id.toString()});
//     console.log(qry);
//     res.send(qry);
// });


export default router;
