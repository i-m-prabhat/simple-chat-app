const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('connected', () =>
{
    console.log('connected to mongo');
});

db.on('err', () =>
{
    console.log('error connecting to mongo');
});

module.exports = db;