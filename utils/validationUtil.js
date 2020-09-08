const { validateContactPayload } = require('../validators');

const validate = (payload, entity) => {
    let validationResponse;
    switch (entity) {
        case 'contacts':
            validationResponse = validateContactPayload(payload);
            break;
        default:
            validationResponse = {};
    }
    return validationResponse;
}

// Exporting Validtion Utility Methods
module.exports = {
    validate,
};