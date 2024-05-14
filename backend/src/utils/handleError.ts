import type { Response } from 'express'
import { ZodError } from 'zod'

export const handleError = (res: Response, error: unknown) => {
  console.error(error)

  if (error instanceof ZodError || error instanceof Error) {
    res.status(400).json({ error: error.message })
  } else {
    res.status(500).json({ error: 'An unknown error occurred' })
  }
}
