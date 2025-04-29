import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({
  id: z.number(),
  name: z.string(),
  ward:z.number(),
  wardName:z.string()
})

export type DataSchema = z.infer<typeof schema>
