// Load modules

var Joi = require('joi');

exports.options = Joi.alternatives().try(Joi.string(), Joi.object().keys({
    path: Joi.string().required(),
    timestampFormat: Joi.string().allow(''),
    utc: Joi.boolean(),
    format: Joi.string(),
    extension: Joi.string().allow(''),
    prefix: Joi.string(),
    rotate: Joi.string().regex(/^(hourly|daily|weekly|monthly)$/i)
}));
