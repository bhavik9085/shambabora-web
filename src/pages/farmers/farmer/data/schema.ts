import { z } from 'zod'

export const schema = z.object({
  id: z.number(),
  
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  
  sex: z.string(),
  
  idType: z.string(),
  idNumber: z.string(),
  
  dob: z.string().refine((val) => !isNaN(Date.parse(val))).transform((val) => new Date(val)),
  
  phoneNumber: z.string().regex(/^\d+$/),
  
  amcosMemberID: z.string(),
  
  mainCrop: z.number(),
  secondaryCrop: z.number(),
  
  amcos: z.any(),
});


export type DataSchema = z.infer<typeof schema>
