const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URL;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const activitiesRouter = require('./routes/activities');
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');
const groupsRouter = require('./routes/groups');

app.use('/activities', activitiesRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/groups', groupsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})