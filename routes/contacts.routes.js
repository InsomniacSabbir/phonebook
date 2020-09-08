const express = require('express');
const router = express.Router();
const { contactsController } = require('../controllers');
const {
    listContacts,
    createContact,
    getContact,
    updateContact,
    removeContact,
} = contactsController;

router.route('/').get(listContacts);

router.route('/').post(createContact);

router.route('/:number').get(getContact);

router.route('/:number').put(updateContact);

router.route('/:number').delete(removeContact);

module.exports = router;