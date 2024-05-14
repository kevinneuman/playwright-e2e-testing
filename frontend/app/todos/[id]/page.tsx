import { ErrorText } from '../../components/ErrorText'
import { Todo } from '../../components/Todo'
import { apiRequest } from '../../lib/apiRequest'
import type { TodoType } from '@/app/lib/types'

export default async function TodoPage({ params }: { params: { id: string } }) {
  const { data, error } = await apiRequest<TodoType>('GET', `todos/${params.id}`)

  return (
    <main className="flex min-h-screen flex-col p-24">
      {data && <Todo todo={data} />}
      {error && <ErrorText error={error} />}
    </main>
  )
}
