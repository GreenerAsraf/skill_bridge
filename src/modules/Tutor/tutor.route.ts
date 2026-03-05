import express from 'express'
import auth, { UserRole } from '../../middlewares/auth'
import { TutorController } from './tutor.controller'

const router = express.Router()
router.post('/', auth(UserRole.tutor), TutorController.createTutors)
router.get('/', auth(UserRole.tutor), TutorController.getAllTutors)
router.get('/:id', auth(UserRole.tutor), TutorController.getSingleTutors)
export const TutorRoutes = router
