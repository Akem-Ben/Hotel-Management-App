import Joi from 'joi'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required,
    password: Joi.string(),
    confirm_password: Joi.string(),
    phone: Joi.string().required()
})