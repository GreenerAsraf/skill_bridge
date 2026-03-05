import { prisma } from '../../lib/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const createUserIntoDb = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 8) // In a real application, hash the password before storing
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword
    }
  })

  const { password, ...userWithoutPassword } = result
  return userWithoutPassword

  console.log('Creating user in database:', payload, userWithoutPassword)
  return result
}

const loginUserIntoDb = async (payload: any) => {
  // Placeholder for login logic
  const user = await prisma.user.findUnique({
    where: { email: payload.email }
  })

  console.log('Login payload:', payload)
  if (!user) {
    return { success: false, message: 'User not found' }
  }

  const userData = {
    id: user.id,
    name: user.name,
    role: user.role,
    status: user.status
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    { userData },
    process.env.JWT_SECRET || 'defaultsecret',
    { expiresIn: '1d' }
  )

  return {
    success: true,
    message: 'User logged in successfully',
    token,
    user
  }
}

export const AuthService = {
  // Add service methods here
  createUserIntoDb,
  loginUserIntoDb
}
