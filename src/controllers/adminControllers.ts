import express, {Request, Response} from 'express'
import Admin from '../model/adminModel'
import { registerSchema } from '../Utils/utils'

//===Register===//
export const adminRegister = async(req:Request,res:Response) => {
    try{
        const {name, email, password, confirm_password, phone} = req.body
        const validateInput = registerSchema.validate(req.body, option)
        if(validateInput.error){
            return res.status(400).json({
                Error: validateInput.error.details[0].message
            })
        }
    }catch(err){
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: "/admin/register"
        })
    }
}