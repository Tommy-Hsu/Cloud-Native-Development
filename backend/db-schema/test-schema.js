const mongoose = require('mongoose');
let User = require('./models/user.model');
let Session = require('./models/session.model');
let Group = require('./models/group.model');

require('dotenv').config();

const uri = process.env.MONGODB_URL;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");

    // insertUser();
    // insertSession();
    insertGroup();
})


function insertUser() {
    const email = "Test-email";
    const password = "Test-password"

    const newUser = new User({
        email,
        password,
    });

    newUser.save()
    .then(() => console.log('User added!'))
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
    const title = "Test Group Title Final";
    const leader = new mongoose.mongo.ObjectId();
    const type = Number(0);
    const category = Number(0);
    const descript = "Test Group Descript Final";
    const price = Number(0);
    const end_date = "[Year][Month][Day] Final";
    const least = Number(0);
    const attend1 = {
        uid: new mongoose.mongo.ObjectId(),
    };
    const attend2 = {
        uid: new mongoose.mongo.ObjectId(),
    };
    const attend3 = {
        uid: new mongoose.mongo.ObjectId(),
    };
    const attends = [attend1, attend2, attend3];
    const number = Number(3);

    const image = "Test Image Final";
    const newGroup = new Group({
        title,
        leader,
        type,
        category,
        descript,
        price,
        end_date,
        least,
        attends,
        number,
        image
    });

    newGroup.save()
    .then(() => console.log('Group added!'))
    .catch(err => console.log('Error: ' + err));
}