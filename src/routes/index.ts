import { Router } from 'express'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { TutorRoutes } from '../modules/Tutor/tutor.route'
import { StudentRoutes } from '../modules/student/student.route'
import { BookingRoutes } from '../modules/Booking/booking.route'

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
  },
  // {
  //   path: "/service",
  //   route: ServiceRoutes,
  // },
  {
    path: '/booking',
    route: BookingRoutes
  }
  // Public categories: /api/categories/...
  // {
  //   path: "/categories",
  //   // route: CategoryRoutes,
  // },

  // // Admin: /api/admin/...
  // {
  //   path: "/admin",
  //   // route: AdminRoutes,
  // },
]

routerManger.forEach((r) => router.use(r.path, r.route))

export default router
