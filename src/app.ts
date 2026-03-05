import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { AuthRoutes } from './modules/Auth/auth.route'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes
// app.use('/api/v1', router);
// Public + Auth
app.use('/api/auth', AuthRoutes)
// app.use("/api/tutors", tutorRoutes);
// Protected
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/admin", adminRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!')
})

export default app
