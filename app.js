import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import airbnbRouter from './routes/airbnb.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Airbnb API',
            version: '0.2.0',
        },
    },
    apis: ['./routes/airbnb.js']
};
const swaggerSpec = swaggerJsdoc(options);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// routes config
app.use('/airbnb', airbnbRouter);
//swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
