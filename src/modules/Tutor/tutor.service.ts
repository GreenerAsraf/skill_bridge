import { prisma } from '../../lib/prisma'

const createTutorIntoDB = async (payload: any, userId: string) => {
  if (!userId) {
    throw new Error('User ID is required to create a tutor')
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!user) {
    throw new Error('Invalid user')
  }

  const result = await prisma.tutor.create({
    data: {
      ...payload,
      userId: userId
    }
  })
  return result
}

const getAllTutorsIntoDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!user) {
    throw new Error('User not found!!')
  }

  const result = await prisma.tutor.findMany({
    where: {
      userId: user.id
    }
  })

  return result
}

const getSingleTutorIntoDB = async (tutorId: string) => {
  const result = await prisma.tutor.findUnique({
    where: {
      id: tutorId
    }
  })

  return result
}

export const TutorService = {
  // Add service methods here
  createTutorIntoDB,
  getAllTutorsIntoDB,
  getSingleTutorIntoDB
}
