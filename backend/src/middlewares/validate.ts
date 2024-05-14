import type { NextFunction, Request, Response } from 'express'
import { type ZodSchema } from 'zod'
import { handleError } from '../utils/handleError'

export const validate = (type: 'body' | 'params' | 'query', schema: ZodSchema<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (type === 'body') {
        schema.parse(req.body)
      }

      if (type === 'params') {
        schema.parse(req.params)
      }

      if (type === 'query') {
        schema.parse(req.query)
      }

      next()
    } catch (error) {
      handleError(res, error)
    }
  }
}
