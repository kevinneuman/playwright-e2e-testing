import type { Request, Response } from 'express'
import { deleteTodoService, getTodoService, getTodosService } from '../services/todo'
import { handleError } from '../utils/handleError'
import type { GenericParamId } from '../validation/params'

export const getTodos = async (_: Request, res: Response) => {
  try {
    const todos = await getTodosService()
    return res.json(todos)
  } catch (error) {
    handleError(res, error)
  }
}

export const getTodo = async (req: Request<GenericParamId>, res: Response) => {
  try {
    const todo = await getTodoService(req.params.id)
    return res.json(todo)
  } catch (error) {
    handleError(res, error)
  }
}

export const deleteTodo = async (req: Request<GenericParamId>, res: Response) => {
  try {
    const deletedTodo = await deleteTodoService(req.params.id)
    return res.json(deletedTodo)
  } catch (error) {
    handleError(res, error)
  }
}
