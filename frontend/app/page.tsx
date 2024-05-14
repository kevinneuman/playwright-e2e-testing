import { ErrorText } from './components/ErrorText'
import { TodoList } from './components/TodoList'
import { apiRequest } from './lib/apiRequest'
import type { TodoType } from './lib/types'

export default async function HomePage() {
  const { data, error } = await apiRequest<TodoType[]>('GET', 'todos')

  return (
    <main className="flex min-h-screen flex-col p-24">
      {data && <TodoList initialTodos={data} />}
      {error && <ErrorText error={error} />}
    </main>
  )
}
