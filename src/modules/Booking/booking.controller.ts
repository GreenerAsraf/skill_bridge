// booking.controller.ts
import { Request, Response } from 'express'
import { BookingService } from './booking.service'

const createBooking = async (req: Request, res: Response) => {
  const userId = req.user?.id as string // from auth middleware

  const result = await BookingService.createBookingIntoDB(
    req.body, // { tutorProfileId, startTime, endTime, notes? }
    userId
  )

  res.status(201).json({
    success: true,
    data: result
  })
}

export const BookingController = { createBooking }
