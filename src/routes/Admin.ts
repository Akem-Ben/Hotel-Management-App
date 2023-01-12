import express from 'express'
import { adminRegister } from '../controllers/adminControllers'

const router = express.Router()


router.post('/register', adminRegister)
export default router