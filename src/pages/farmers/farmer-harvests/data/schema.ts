import { z } from 'zod';

// Define the Zod schema for the collection record
export const schema = z.object({
  id: z.number(),
  
  farmer: z.number(),
  farmerName: z.string(),
  farmerPhoneNumber: z.string(),
  
  quantity: z.any(),
  uom: z.string(),
  packaging: z.string(),
  tagNumber: z.any(),
  receiptNumber: z.string(),
  
  amcos: z.number(),
  amcosName: z.string(),
  
  receivedBy: z.number(),
  receivedByName: z.string(),
  
  crop: z.number(),
  cropName: z.string(),
  
  cropGrade: z.number(),
  cropGradeName: z.string(),
  
  collectionCenter: z.number(),
  collectionCenterName: z.string(),
  
  receivedAt: z.string(),
});

export type DataSchema = z.infer<typeof schema>;

// "farmer": 1,
// "farmerName": "",
// "farmerPhoneNumber": "",
// "grossWeight": "",
// "netWeight": "",
// "packagingWeight": "",
// "moistureContent": "",
// "bagsData": null,
// "receiptNumber": "",
// "amcos": 1,
// "receivedBy": 1,
// "receivedByName": "",
// "crop": 1,
// "collectionCenter": 1,
// "tumeNumber": ""
