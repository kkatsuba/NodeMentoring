import express from 'express';
import cookieParser from 'cookie-parser';
import apiRoute from './routes/init/api';
import logger from 'morgan';

const app = express();
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(apiRoute);

export default app;
