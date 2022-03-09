const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    username:Joi.string().required().min(3),

    password:Joi.string().min(4).required(),
})

module.exports = {authSchema,}