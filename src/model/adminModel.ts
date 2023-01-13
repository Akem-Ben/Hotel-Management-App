import mongoose, {Schema} from 'mongoose'

export interface IAdmin {
    _id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    salt: string,
    lng: number,
    lat: number,
    role: string,
}

const adminSchema = new Schema({
    name: {
        type: String,
        require: [true, `Please input your name`]
    },
    email:  {
        type: String,
        require: [true, `Please input your email`],
        unique: true
    },
    password: {
        type: String,
        require: [true, `please input your password`]
    },
    phone: {
        type: String
    },
    salt: {
        type: String
    },
    lng: {
        type: Number
    },
    lat: {
        type: Number
    },
    role: {
        type: String
    }
},
    {
        timestamps: true
    }
)

const Admin = mongoose.model<IAdmin>('Admin', adminSchema)

export default Admin