import { Request, Response } from 'express'
import { StudentService } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    // Call the service method to create a student
    const result = await StudentService.createStudentIntoDB(req.body)

    // Send the response
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result
    })
  } catch (error: any) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    })
  }
}

// const getAllStudents = async (req: Request, res: Response) => {
//   try {
//     const result = await StudentService.getAllStudentsFromDB()

//     res.status(200).json({
//       success: true,
//       message: 'Students retrieved successfully',
//       data: result
//     })
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: 'Error retrieving students',
//       error: error.message
//     })
//   }
// }

// const getSingleStudent = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const result = await StudentService.getSingleStudentFromDB(id)

//     res.status(200).json({
//       success: true,
//       message: 'Student retrieved successfully',
//       data: result
//     })
//   } catch (error: any ) {
//     res.status(500).json({
//       success: false,
//       message: 'Error retrieving student',
//       error: error.message
//     })
//   }
// }

export const StudentController = {
  // Add controller methods here
  createStudent
  //   getAllStudents
  //   getSingleStudent
}
