import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({
  id: z.number(),
  messae: z.string().optional(),
  amcos: z.number(),
  date: z.string().optional(),
  status: z.string().optional(),
})

export type DataSchema = z.infer<typeof schema>
