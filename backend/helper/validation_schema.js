const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    firstname:Joi.string().required().min(3),
    lastname:Joi.string().required().min(3),
    password:Joi.string().min(8).required(),
})

module.exports = {authSchema,}