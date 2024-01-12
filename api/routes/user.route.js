import express from 'express'
import * as userController from '../controllers/user.controller.js'
const route=express.Router()

route.get('/all',userController.test)

export default route