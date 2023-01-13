import mongoose, {Schema} from 'mongoose'

export interface IRoom {
    _id: string,
    roomType: string,
    roomNumber: string,
    roomPrice: number,
    roomStatus: string,
    roomImage: string
}

const roomSchema = new Schema ({
    roomType: {
        type: String,
        require: [true, `Please input room type`]
    },
    roomNumber: {
        type: String,
        require: [true, `Please input room number`]
    },
    roomPrice: {
        type: Number,
        require: [true, `Please input room price`]
    },
    roomStatus: {
        type: String
    },
    roomImage: {
        type: String
    }
},
{
    timestamps: true
}
)

const Room = mongoose.model<IRoom>('Rooms', roomSchema)

export default Room