import express from 'express'

import auth, { UserRole } from '../../middlewares/auth'
import { StudentController } from './student.controller'

const router = express.Router()

router.post('/', auth(UserRole.student), StudentController.createStudent)
// router.get('/', auth(UserRole.tutor), StudentController.getAllStudents)
// router.get('/:id', auth(UserRole.tutor), StudentController.getSingleStudent)

export const StudentRoutes = router
