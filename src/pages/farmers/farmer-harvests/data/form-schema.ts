
import { z } from 'zod';

export const formSchema = z.object({
    farmer: z.any(),
//   firstName: z.string().min(1, { message: 'Please enter first name' }),
  farmerName: z.string().min(1, { message: 'Please enter middle name' }),
  farmerPhoneNumber: z.string().min(1, { message: 'Please enter last name' }),
  tagNumber: z.string().min(1, { message: 'Please enter ID number' }),
  quantity: z.string().min(1, { message: 'Please enter phone number' }),
  receiptNumber: z.string().min(1, { message: 'Please enter member ID' }),
  tumeNumber: z.string().min(1, { message: 'Please enter tume number' }),
  amcos: z.any(),
  crop: z.string().min(1, { message: 'Please select secondary crop' }).transform(Number),
  collectionCenter: z.any(),
  grossWeight: z.string().min(1, { message: 'Please enter gross weight' }),
  netWeight: z.string().min(1, { message: 'Please enter net weight' }),
  packagingWeight: z.string().min(1, { message: 'Please enter packaging weight' }),
  moistureContent: z.string().min(1, { message: 'Please enter moisture content' }),
  bagsData: z.array(
    z.object({
      grossWeight: z.string().min(1, { message: 'Please enter gross weight' }),
      netWeight: z.string().min(1, { message: 'Please enter net weight' }),
      moistureContent: z.string().min(1, { message: 'Please enter moisture content' }),
      packagingWeight: z.string().min(1, { message: 'Please enter packaging weight' }),
      tagNumber: z.number()
    })
  )
});

export type FormSchema = z.infer<typeof formSchema>;