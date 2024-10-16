import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE } from "./app/config/config.js";
import router from "./app/routes/api.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(cookieParser());
app.use(helmet());

// Rate limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

// Database connection
mongoose.connect(DATABASE, { autoIndex: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log("MongoDB connection error");
    });

// Routes
app.use("/api", router);

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
