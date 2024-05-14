'use client'

import Link from 'next/link'
import { useState, type FC } from 'react'
import { apiRequest } from '../lib/apiRequest'
import type { TodoType } from '../lib/types'
import { ErrorText } from './ErrorText'

type Props = {
  initialTodos: TodoType[]
}

export const TodoList: FC<Props> = ({ initialTodos }) => {
  const [todos, setTodos] = useState<TodoType[]>(initialTodos)
  const [error, setError] = useState('')

  const handleDelete = async (todoId: string) => {
    const { error: deleteError } = await apiRequest('DELETE', `todos/${todoId}`)

    if (deleteError) {
      setError(deleteError)
      return
    }

    const { data: todosData, error: todosError } = await apiRequest<TodoType[]>('GET', 'todos')

    if (todosError) {
      setError(todosError)
      return
    }

    if (todosData) {
      setTodos(todosData)
    }

    setError('')
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl">Todos</h1>

      {todos.length > 0 ? (
        <ul className="flex flex-col gap-8">
          {todos.map((todo) => (
            <li key={todo.id} className="flex gap-8">
              <Link
                className="flex flex-col flex-1 p-4 hover:bg-slate-700"
                href={`/todos/${todo.id}`}
              >
                <h1 className="text-2xl text-yellow-600">{todo.title}</h1>
                <p>{todo.description}</p>
              </Link>
              <button className="border-2 p-2" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>All done</p>
      )}

      {error && <ErrorText error={error} />}
    </div>
  )
}
