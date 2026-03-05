import express from 'express'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post('/register', AuthController.createUser)

router.post('/login', AuthController.loginUser) // Placeholder for login route, should be replaced with actual login method

export const AuthRoutes = router
