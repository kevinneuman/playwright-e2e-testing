'use client'

import type { FC } from 'react'

type Props = {
  error: string
}

export const ErrorText: FC<Props> = ({ error }) => <p className="text-red-600">{error}</p>
