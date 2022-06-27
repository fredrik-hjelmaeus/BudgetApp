import { NextFunction, Request, Response } from "express";

import express from "express";
import connectDB from "./config/db";
const app = express();
import fileUpload from "express-fileupload";
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
import dotenv from "dotenv";
import path from "path";

// Load env vars
dotenv.config();

// verify env vars is in the .env file
const verifyEnvironmentVariables = () => {
  console.log("verifying environment variables");
  if (!process.env.NODE_ENV) {
    console.error("NODE_ENV is not defined");
    process.exit(1);
  }
  if (!process.env.mongoURI) {
    console.error("mongoURI is not defined");
    process.exit(1);
  }
  if (!process.env.jwtSecret) {
    console.error("jwtSecret is not defined");
    process.exit(1);
  }
  if (!process.env.PORT) {
    console.error("PORT is not defined");
    process.exit(1);
  }
  if (!process.env.SMTP_HOST) {
    console.error("SMTP_HOST is not defined");
    process.exit(1);
  }
  if (!process.env.SMTP_PORT) {
    console.error("SMTP_PORT is not defined");
    process.exit(1);
  }
  if (!process.env.SMTP_EMAIL) {
    console.error("SMTP_EMAIL is not defined");
    process.exit(1);
  }
  if (!process.env.SMTP_PASSWORD) {
    console.error("SMTP_PASSWORD is not defined");
    process.exit(1);
  }
  if (!process.env.FROM_EMAIL) {
    console.error("FROM_EMAIL is not defined");
    process.exit(1);
  }
  if (!process.env.FROM_NAME) {
    console.error("FROM_NAME is not defined");
    process.exit(1);
  }
  if (!process.env.resetpasswordURL) {
    console.error("resetpasswordURL is not defined");
    process.exit(1);
  }
  if (!process.env.SENDINBLUE_API_KEY) {
    console.error("SENDINBLUE_API_KEY is not defined");
    process.exit(1);
  }
};

console.log("env mode:", process.env.NODE_ENV);
// Connect Database
process.env.NODE_ENV !== "test" && verifyEnvironmentVariables();
process.env.NODE_ENV !== "test" && process.env.mongoURI && connectDB(process.env.mongoURI);

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
  console.log("errorhandler! reporting");
  //console.log(err);

  if (!res.headersSent) {
    //console.log(err.httpStatusCode);
    // return res.status(err.httpStatusCode || 500).send(err.message);
    res.status(500).send(err.message);
  }
});

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/userpreset", require("./routes/userpreset"));
app.use("/api/userpreset/upload", require("./routes/upload"));
app.use("/api/guide", require("./routes/guide"));

//production mode
const productionPath = path.join(__dirname, "../", "client", "build", "index.html");
app.get("/*", (req, res) => {
  console.log("catchallpath detected");
  res.sendFile(productionPath);
});

/* app.get(
  "/*",
  (req, res) => {
    console.log(__dirname);
    console.log(req.params);
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  }
   res.sendFile(path.join("client", "build", "index.html"))
); */

export default app;
