import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.a
export const schema = z.object({
  id: z.number(),
  trainer: z.string().optional(),
  amcos: z.number(),
  farmers: z.array(z.nullable(z.any())),
  date: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional()
})

export type DataSchema = z.infer<typeof schema>
