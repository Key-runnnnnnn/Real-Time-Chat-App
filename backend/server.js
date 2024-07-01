import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 3000

// Middlewares
app.use(express.json()) // to parse the incoming request with JSON payloads(req.body)
app.use(cookieParser()) // to parse the incoming request cookies
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  connectToMongoDB()
  console.log(`Server is running on port ${PORT}`)
})