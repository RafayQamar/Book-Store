// const express = require('express')
// const dotenv = require('dotenv')

import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";

dotenv.config();

const app = express()
// const port = 3000
app.use(cors());
app.use(express.json());

const ports = process.env.PORT || 4000
const URI = process.env.MongoDBURI
// connect to mongoDB

// mongoose.Promise =global.Promise
mongoose.connect(URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// defining route
app.use("/book", bookRoute)
app.use("/user", userRoute)

app.listen(ports, () => {
  console.log(`Server app listening on port ${ports}`)
})




//Dt1sjfnku51iBmvd