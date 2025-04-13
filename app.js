import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import airbnbRouter from './routes/airbnb.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes config
app.use('/airbnb', airbnbRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})

export default app;
