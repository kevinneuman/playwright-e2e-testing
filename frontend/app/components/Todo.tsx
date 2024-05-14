'use client'

import { type FC } from 'react'
import type { TodoType } from '../lib/types'

type Props = {
  todo: TodoType
}

export const Todo: FC<Props> = ({ todo }) => (
  <div className="flex flex-col gap-8">
    <h1 className="text-8xl text-yellow-600">{todo.title}</h1>
    <p className="text-4xl">{todo.description}</p>
  </div>
)
