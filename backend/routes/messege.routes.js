import express from 'express'
import { sendMessege } from '../controllers/messege.controller.js'
import protectRoute from '../middleware/protectRoute.js'
const router = express.Router()

router.post('/send/:id', protectRoute, sendMessege)
export default router