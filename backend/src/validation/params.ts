import { z } from 'zod'

export const GenericParamIdSchema = z.object({
  id: z.string().uuid(),
})

export type GenericParamId = z.infer<typeof GenericParamIdSchema>
