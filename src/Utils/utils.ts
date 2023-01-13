import Joi from 'joi'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.string().equal(Joi.ref('password')).required().
    label('Confirm Password').messages({"any.only":"{{label}} does not match"}),
    phone: Joi.string().required()
})

export const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
})
export const roomSchema = Joi.object().keys({
    roomType: Joi.string().required(),
    roomNumber: Joi.string().required(),
    roomPrice: Joi.number().required(),
    // roomStatus: Joi.string(),
    // roomImage: Joi.string()
})


export const option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        }
    }
}

export const SaltGenerator = async ()=>{
    return await bcrypt.genSalt()
}

export const PasswordHash = async (password:string,salt:string)=>{
    return await bcrypt.hash(password, salt)
}

export const tokenGenerator = async(_id:string)=>{
    if(process.env.APP_SECRET){
        return await jwt.sign({_id}, process.env.APP_SECRET, {expiresIn: `1d`})
    }
}