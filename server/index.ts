/** @format */

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connect from './config/database';

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
import route from './routes/index';

route(app);

// Database
connect();

// server listenning
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
