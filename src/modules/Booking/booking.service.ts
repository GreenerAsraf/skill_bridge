import { BookingStatus } from '../../../generated/prisma/client'
import { prisma } from '../../lib/prisma'

interface CreateBookingPayload {
  tutorProfileId: string
  startTime: string // ISO string from client
  endTime: string // ISO string from client
  notes?: string
}

/**
 * Creates a booking for a student with a tutor.
 * - Checks user exists and is STUDENT (optional but recommended).
 * - Checks tutorProfile exists and is active.
 * - Calculates duration & price (if you store hourlyRate on tutor).
 * - Creates Booking with status = CONFIRMED.
 */
const createBookingIntoDB = async (
  payload: CreateBookingPayload,
  userId: string
) => {
  // 1. User exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Optional: ensure user is a student
  // if (user.role !== "STUDENT") {
  //   throw new Error("Only students can create bookings");
  // }

  // 2. Tutor profile exists
  const tutorProfile = await prisma.tutor.findUnique({
    where: { id: payload.tutorProfileId },
    include: {
      user: true
    }
  })

  if (!tutorProfile) {
    throw new Error('Tutor not found')
  }

  // 3. Calculate duration and price (if you have hourlyRate)
  const start = new Date(payload.startTime)
  const end = new Date(payload.endTime)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid startTime or endTime')
  }

  if (end <= start) {
    throw new Error('End time must be after start time')
  }

  const durationMs = end.getTime() - start.getTime()
  const durationHours = durationMs / (1000 * 60 * 60)

  let price: number | null = null
  if (tutorProfile.hourlyRate != null) {
    price = durationHours * tutorProfile.hourlyRate
  }

  // 4. (Optional) check availabilitySlot here if you implement slot-based booking

  // 5. Create booking
  const booking = await prisma.booking.create({
    data: {
      userId, // student
      tutorId: tutorProfile.userId, // tutor is the user behind this profile
      tutorProfileId: tutorProfile.id,
      startTime: start,
      endTime: end,
      status: BookingStatus.CONFIRMED,
      price,
      notes: payload.notes ?? null
    }
  })

  return booking
}

export const BookingService = {
  createBookingIntoDB
}
