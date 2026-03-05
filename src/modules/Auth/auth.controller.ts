import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import sendResponse from '../../utils/sendResponse'

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.createUserIntoDb(req.body)

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User created successfully',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || 'Error creating user',
      data: null
    })
    console.error('Error creating user:', error)
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    // Placeholder for login logic
    const result = await AuthService.loginUserIntoDb(req.body)
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User logged in successfully',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || 'Error logging in user',
      data: null
    })
    console.error('Error logging in user:', error)
  }
}

export const AuthController = {
  // Add controller methods here
  createUser,
  loginUser
}
