const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const uri = process.env.MONGODB_URL;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

const eventSearch = require('./routes/event-search');

app.use('/', eventSearch);

let appServer = app.listen(port,()=>{
    console.log(`server listen to http://localhost:${port}`)
})

module.exports = appServer;