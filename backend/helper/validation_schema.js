const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    username:Joi.string().required().min(3),

    password:Joi.string().min(8).required(),
})

module.exports = {authSchema,}