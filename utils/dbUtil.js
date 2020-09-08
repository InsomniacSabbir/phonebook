const mongoose = require('mongoose');
const { dbConfig } = require('../config');

const initConnection = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;

        mongoose.connect(dbConfig.mongoURI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

        mongoose.connection.on('connected', () => {
            console.log(`open db at: ${dbConfig.mongoURI}`);
            resolve();
        });

        mongoose.connection.on('error', (err) => {
            console.log(`error: ${err}`);
            reject(err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('disconnected');
        });
    });
};

const closeConnection = () => {
    mongoose.connection.close(() => {
        console.log('mongoose disconnected app termination');
        process.exit(0);
    });
}

module.exports = {
    initConnection,
    closeConnection,
}