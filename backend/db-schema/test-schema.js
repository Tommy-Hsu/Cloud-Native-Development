const mongoose = require('mongoose');
let Activity = require('./models/activity.model');
let User = require('./models/user.model');
let Session = require('./models/session.model');
let Group = require('./models/group.model');

require('dotenv').config();

const uri = process.env.MONGODB_URL;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");

    insertUser();
    insertActivity();
    insertSession();
    insertGroup();
})


function insertUser() {
    const username = "Test-username";
    const newUser = new User({
        username,
    });

    newUser.save()
    .then(() => console.log('User added!'))
    .catch(err => console.log('Error: ' + err));
}

function insertActivity() {
    const name = "Test-name";
    const type = Number(0);
    const category = Number(0);
    const description = "Test-description";
    const price = Number(0);
    const minMember = Number(0);
    const currentMember = Number(0);
    const date = Date();

    const newActivity = new Activity({
        name,
        type,
        category,
        description,
        price,
        minMember,
        currentMember,
        date,
    });

    newActivity.save()
    .then(() => console.log('Activity added!'))
    .catch(err => console.log('Error: ' + err));
}

function insertSession() {
    const session = "Test-session";
    var uid = new mongoose.mongo.ObjectId();

    const newSession = new Session({
        session,
        uid,
    });

    newSession.save()
    .then(() => console.log('Session added!'))
    .catch(err => console.log('Error: ' + err));
}

function insertGroup() {
    const title = "Test-Group-title";
    const leader = new mongoose.mongo.ObjectId();
    const type = Number(0);
    const category = Number(0);
    const descript = "Test-Group-descript";
    const price = Number(0);
    const end_date = "[Year][Month][Day]";
    const least = Number(0);
    const attends = {
        "uid": new mongoose.mongo.ObjectId(),
        "number": Number(0),
    };

    const newGroup = new Group({
        title,
        leader,
        type,
        category,
        descript,
        price,
        end_date,
        least,
        attends
    });

    newGroup.save()
    .then(() => console.log('Group added!'))
    .catch(err => console.log('Error: ' + err));
}