const {
    responseHandler: { sendSuccessResponse, sendErrorResponse, } = {},
    validationUtil: { validate } = {},
} = require('../utils');
const { crudService } = require('../services');
const {
    listDataFromDb,
    createDataInDb,
    getDataFromDb,
    updateDataInDb,
    removeDataFromDb,
} = crudService;

const listContacts = async (req, res) => {
    try {
        const data = await listDataFromDb();
        sendSuccessResponse(
            { req, res },
            'ok',
            data && data.length > 0 ? 200 : 204,
            data,
            data && data.length > 0 ? 'Contacts Records Fetched Successfully.' : 'No Records Found For Contacts.'
        );
    } catch (err) {
        sendErrorResponse({ req, res }, 'error', 500, err, 'Error While Fetching Contacts Records.');
    }
}

/**
 * Request To Create A Contact
 */
const createContact = async (req, res) => {
    try {
        const { error } = validate(req.body, 'contacts');
        const [isValid, errors] = [!error, error];
        if (isValid) {
            const data = await createDataInDb({...req.body });
            sendSuccessResponse({ req, res }, 'ok', 201, data, 'Contacts Record Added Successfully.');
        } else {
            sendErrorResponse({ req, res }, 'badRequest', 400, errors, 'Invalid Contact Payload.');
        }
    } catch (err) {
        sendErrorResponse({ req, res }, 'error', 500, err, 'Error While Creating Contacts Record.');
    }
}

/**
 * Handles Request To Return A Contact Based On Input Number i.e Route Param
 */
const getContact = async (req, res) => {
    try {
        const data = await getDataFromDb(req.params.number);
        sendSuccessResponse(
            { req, res },
            'ok',
            data ? 200 : 204,
            data,
            data ? 'Contacts Record Fetched Successfully.' : `No Record Found For number: '${req.params.number}' In Contacts.`
        );
    } catch (err) {
        sendErrorResponse({ req, res }, 'error', 500, err, 'Error While Fetchig Contacts Record.');
    }
}

/**
 * Handles Request To Update A Contact
 */
const updateContact = async (req, res) => {
    try {
        const isExist = await getDataFromDb(req.params.number);
        let data = null;
        if (!isExist) {
            sendSuccessResponse(
                { req, res },
                'ok',
                204,
                {},
                `No Record Found For number: '${req.params.number}' In Contacts.`
            );
        } else {
            const { error } = validate(req.body, 'contacts');
            const [isValid, errors] = [!error, error];
            if (isValid) {
            
                data = await updateDataInDb(req.params.number, req.body);
                sendSuccessResponse(
                    { req, res },
                    'ok',
                    200,
                    data,
                    `Contacts Record With number: '${req.params.number}' Updated Successfully In Contacts.`
                );
            } else {
                sendErrorResponse({ req, res }, 'badRequest', 400, errors, 'Invalid Contact Payload.');
            }
        }
    } catch (err) {
        sendErrorResponse({ req, res }, 'error', 500, err, 'Error While Updating Contacts Record.');
    }
}

/**
 * Handles Request To Remove A Contacts Based On Input Number i.e Route Param
 */
const removeContact = async (req, res) => {
    try {
        const isExist = await getDataFromDb(req.params.number);
        let data = null;
        if (isExist) {
        
            data = await removeDataFromDb(req.params.number);
        }
        sendSuccessResponse(
            { req, res },
            'ok',
            isExist ? 200 : 204,
            isExist ? data : {},
            isExist ? `Contacts Record With Number: '${req.params.number}' Deleted Successfully In Contacts.` : `No Record Found For Number: '${req.params.number}' In Contacts.`
        );
    } catch (err) {
        sendErrorResponse({ req, res }, 'error', 500, err, 'Error While Deleting Contacts Record.');
    }
}

// Exporting Request Handlers
module.exports = {
    listContacts,
    createContact,
    getContact,
    updateContact,
    removeContact,
}