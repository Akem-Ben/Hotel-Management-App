import express, {Request, Response} from 'express'
import Admin from '../model/adminModel'
import Room  from '../model/roomsModel'
import { registerSchema, option, SaltGenerator, PasswordHash, loginSchema, tokenGenerator, roomSchema } from '../Utils/utils'
import bcrypt from 'bcryptjs'

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
        
        const salt = await SaltGenerator()
        const hashedPassword = await PasswordHash(password, salt)
        const admin = await Admin.findOne({email})
        if(!admin){
            let allAdmin = await Admin.create({
                name,
                email,
                password: hashedPassword,
                confirm_password: hashedPassword,
                salt,
                phone,
                lng: 0,
                lat: 0,
                role: "Admin"
            })
            // const mainAdmin = await Admin.findOne({email})
            return res.status(201).json({
                message: `Admin Successfully Generated`,
                name: allAdmin.name,
                email: allAdmin.email,
                phone: allAdmin.phone,
                role: allAdmin.role
            })
        }
        return res.status(400).json({
            message: `Admin Already Exist`,
            Error: "Admin Already Exist"
        })
    }catch(err){
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: "/admin/register"
        })
    }
}

//======LOGIN=====//

export const adminLogin = async(req:Request, res:Response) => {
    try{
        const {email, password} = req.body
        const validateInput = loginSchema.validate(req.body, option)
        console.log(validateInput)
        if(validateInput.error){
            return res.status(400).json({
                Error: validateInput.error.details[0].message
            })
        }
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(400).json({
                message: `Admin not registered`,
                Error: `Admin Not found`
            })
        }
        if(admin){
            const validate = await bcrypt.compare(password, admin.password)
            if(!validate){
                return res.status(400).json({
                    message: "Invalid Password"
                })
            }
            if(validate){
                const token = await tokenGenerator(`${admin._id}`)
                res.cookie(`token`, token)
                return res.status(200).json({
                    message: `Successful login`,
                    id: admin._id,
                    role: admin.role,
                    email: admin.email
                })
            }
        }
        return res.status(400).json({
            message: `Invalid Credentials`
        })
    }catch(err){
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/admin/login`
        })
    }
}

//===CREATE ROOMS===//

export const createRoom = async (req:Request,res:Response)=>{
    try{
        const id = req.params._id
        const admin = await Admin.findOne({_id:id})
        if(!admin){
            return res.status(400).json({
                message: "You are not an admin"
            })
        }
        if(admin){
            const {roomType, roomNumber, roomPrice} = req.body
            const validateInput = roomSchema.validate(req.body, option)
            if(validateInput.error){
                return res.status(400).json({
                    Error: validateInput.error.details[0].message
                })
            }
            const room = await Room.findOne({roomNumber})
            if(!room){
                let newRoom = await Room.create({
                    roomType,
                    roomNumber,
                    roomPrice,
                    roomStatus: "",
                    roomImage: ""
                })
                return res.status(201).json({
                    message: "Room successfully created",
                    newRoom
                })
            }
            return res.status(400).json({
                message: `Room already exists`,
                Error: `Room already exists`
            })
        }
    }catch(err){
        return res.status(500).json({
            message: "Internal Server Error",
            Error: "/admin/create-room"
        })
    }
}