const Joi = require('@hapi/joi');

const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    number: Joi.number().required(),
});

module.exports = (payload) => schema.validate(payload);
