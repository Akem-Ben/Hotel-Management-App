import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import AdminRoutes from './routes/Admin'

const app = express()
dotenv.config()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(logger('dev'))
app.use(express.static(path.join(process.cwd(),'./pubic')))

//Routes
app.use('/admin', AdminRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`App is listening on port ${process.env.PORT}`)
})

export default app