import { NextFunction, Request, Response } from 'express';

import express from 'express';
const connectDB = require('./config/db');
const app = express();
import path from 'path';
import fileUpload from 'express-fileupload';
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// Connect Database
process.env.NODE_ENV !== 'test' && connectDB();

// Init Middleware
//app.use(express.json({ extended: false }));
app.use(express.json());
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
//app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 300, //num of request allowed
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Common Error handler that communicates with frontend
// It's task is to provide frontend with a uniform json-structured response to avoid
// having to handle special cases for every error.
// TODO: put in separate file and create interface for json-error-structure
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('errorhandler! reporting');
  //console.log(err);

  if (!res.headersSent) {
    //console.log(err.httpStatusCode);
    // return res.status(err.httpStatusCode || 500).send(err.message);
    res.status(500).send(err.message);
  }
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/userpreset', require('./routes/userpreset'));
app.use('/api/userpreset/upload', require('./routes/upload'));
app.use('/api/guide', require('./routes/guide'));

export default app;
