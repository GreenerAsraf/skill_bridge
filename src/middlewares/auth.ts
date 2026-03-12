import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
// import { secret } from "../modules/Auth/auth.service";
import { prisma } from '../lib/prisma'

export enum UserRole {
  admin = 'ADMIN',
  tutor = 'TUTOR',
  student = 'STUDENT'
}

type DecodedToken = JwtPayload & {
  userData: {
    id: string
    name: string
    role: UserRole
    status: string
    email?: string
  }
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Is token exists .
      // verify token .
      // Is decoded user exists .
      // Is users status Active  .
      // check Role

      const authHeader = req.headers.authorization

      if (!authHeader) {
        throw new Error('Token not found!!')
      }

      const token = authHeader.split(' ')[1]

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken

      if (!decoded || !decoded.userData) {
        throw new Error('Unauthorized decoded token!')
      }

      const userData = await prisma.user.findUnique({
        where: {
          // email: decoded.email
          id: decoded.userData.id
        }
      })
      if (!userData) {
        throw new Error('Unauthorized userdata auth ts!')
      }

      if (userData.status !== 'ACTIVE') {
        throw new Error('Unauthorized!! Your account is not active.')
      }

      if (roles.length && !roles.includes(decoded.userData.role)) {
        throw new Error('Unauthorized!!! role is not matched')
      }

      // req.user = decoded
      req.user = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        status: userData.status,
        name: userData.name
      }
      next()
    } catch (error: any) {
      next(error)
    }
  }
}

export default auth
