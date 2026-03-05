import 'dotenv/config'
import { Pool } from 'pg' // Import Pool
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client'

// 1. Create the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true // Neon requires SSL
})

// 2. Pass the pool instance to the adapter
const adapter = new PrismaPg(pool)

// 3. Initialize Prisma with the adapter
const prisma = new PrismaClient({ adapter })

export { prisma }
