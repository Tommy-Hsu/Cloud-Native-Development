const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const app = express();
const port = process.env.PORT || 5000;

const eventSearch = require('./routes/event-search');

app.use('/', eventSearch);

app.listen(port,()=>{
    console.log(`server listen to http://localhost:${port}`)
})