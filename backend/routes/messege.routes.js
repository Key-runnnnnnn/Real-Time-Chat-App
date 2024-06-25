import express from 'express'
import { sendMessege } from '../controllers/messege.controller.js'
import protectRoute from '../middleware/protectRoute.js'
import { getMesseges } from '../controllers/messege.controller.js'
const router = express.Router()

router.get('/:id', protectRoute, getMesseges)
router.post('/send/:id', protectRoute, sendMessege)
export default router