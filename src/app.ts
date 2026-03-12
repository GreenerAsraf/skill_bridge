import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { AuthRoutes } from './modules/Auth/auth.route'
import { notFound } from './middlewares/notFound'
import { TutorRoutes } from './modules/Tutor/tutor.route'
import router from './routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!')
})
// app.use(errorHandler)
app.use(notFound)

export default app

// Public + Auth
// app.use('/api/auth', AuthRoutes)
// app.use('/api/tutors', TutorRoutes)
// Protected
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/admin", adminRoutes);
