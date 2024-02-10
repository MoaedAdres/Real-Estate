import express from 'express'
import * as authController from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/sign-up', authController.signup)

router.post('/sign-in', authController.signin)

router.post('/google', authController.google)
export default router