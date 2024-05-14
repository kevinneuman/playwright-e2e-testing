import express from 'express'
import { validate } from '../middlewares/validate'
import { GenericParamIdSchema } from '../validation/params'
import { deleteTodo, getTodo, getTodos } from './todo'

export const router = express.Router()

router.get('/todos', getTodos)

router.get('/todos/:id', validate('params', GenericParamIdSchema), getTodo)

router.delete('/todos/:id', validate('params', GenericParamIdSchema), deleteTodo)
