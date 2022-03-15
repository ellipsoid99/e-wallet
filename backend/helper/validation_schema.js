const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    accountnumber:Joi.number(),
    firstname:Joi.string().min(3),
    lastname:Joi.string().min(3),
    password:Joi.string().min(8).required(),
    // phoneNumber:Joi.number(),
    // balance:Joi.number(),

})

module.exports = {authSchema,}