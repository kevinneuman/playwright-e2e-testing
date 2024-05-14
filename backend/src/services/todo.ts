import { prismaClient } from '../utils/prismaClient'

export const getTodosService = () =>
  prismaClient.todo.findMany({
    orderBy: { createdAt: 'desc' },
  })

export const getTodoService = (id: string) =>
  prismaClient.todo.findUniqueOrThrow({
    where: { id },
  })

export const deleteTodoService = (id: string) => prismaClient.todo.delete({ where: { id } })
