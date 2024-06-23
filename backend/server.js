import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import messegeRoutes from './routes/messege.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

dotenv.config()

// Middlewares
app.use(express.json()) // to parse the incoming request with JSON payloads(req.body)
app.use(cookieParser()) // to parse the incoming request cookies
app.use("/api/auth",authRoutes);
app.use("/api/messeges",messegeRoutes);


app.listen(PORT, () => {
  connectToMongoDB()
  console.log(`Server is running on port ${PORT}`)
})