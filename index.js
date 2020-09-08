const express = require('express');
const bodyParser = require('body-parser');
const { contactsRoutes } = require('./routes');
const {
    dbUtil: { initConnection } = {},
} = require('./utils');

const init = () => {
    (async () => {
        try {
            await initConnection();
        } catch (err) {
            console.log('Error is => ', err);
        }
    })();
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/contacts', contactsRoutes);

app.listen(3000, err => {
    if (!err) {
        console.log('Server is listening on port: 3000');
        init();
    }
});

module.exports = app;