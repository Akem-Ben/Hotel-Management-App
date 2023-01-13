import express from 'express'
import { adminLogin, adminRegister, createRoom } from '../controllers/adminControllers'

const router = express.Router()


router.post('/register', adminRegister)
router.post('/login', adminLogin)
router.post('/create-room/:_id', createRoom)
export default router