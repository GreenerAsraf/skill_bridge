import { Request, Response } from 'express'
import sendResponse from '../../utils/sendResponse'
import { TutorService } from './tutor.service'

const createTutors = async (req: Request, res: Response) => {
  try {
    console.log('Controller', req.user)
    const result = await TutorService.createTutorIntoDB(req.body, req.user?.id)

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User created',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: error?.message || 'Something went wrong!!',
      data: null
    })
  }
}

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.getAllTutorsIntoDB(req.user?.id)

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Tutors retrieved Successfully.',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: error?.message || 'Something went wrong!!',
      data: null
    })
  }
}

const getSingleTutors = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.getSingleTutorIntoDB(
      req.params?.id as string
    )

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Tutors retrieved Successfully.',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: error?.message || 'Something went wrong!!',
      data: null
    })
  }
}

export const TutorController = {
  // Add controller methods here
  createTutors,
  getAllTutors,
  getSingleTutors
}
