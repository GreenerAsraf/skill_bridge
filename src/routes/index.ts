import { Router } from 'express'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { TutorRoutes } from '../modules/Tutor/tutor.route'
import { StudentRoutes } from '../modules/student/student.route'

const router = Router()

const routerManger = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/tutor',
    route: TutorRoutes
  },
  {
    path: '/student',
    route: StudentRoutes
  }
  // {
  //   path: "/service",
  //   route: ServiceRoutes,
  // },
  // {
  //   path: "/booking",
  //   route: BookingRoutes,
  // },
]

routerManger.forEach((r) => router.use(r.path, r.route))

export default router
