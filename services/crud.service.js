const {
    contacts,
} = require('../models');

const listDataFromDb = async () => {
    return dbQuery.lean();
}

const findOneFromDb = async (query) => {
    return contacts.findOne(query).select(select);
}

const createDataInDb = async (payload) => {
    const doc = new contacts(payload);
    return doc.save();
}

const getDataFromDb = async (number) => {
    return contacts.find({number: number});
}

const updateDataInDb = async (number, payload) => {
    return contacts.findOneAndUpdate({number: number}, payload, { new: true });
}

const removeDataFromDb = async (number) => {
    return contacts.findOneAndRemove({number: number}).exec();
}

module.exports = {
    listDataFromDb,
    findOneFromDb,
    createDataInDb,
    getDataFromDb,
    updateDataInDb,
    removeDataFromDb,
}