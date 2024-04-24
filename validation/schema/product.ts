import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255),
  price: z.number().min(1, 'Price is required.').max(100000000),
  stock_quantity: z.number().min(1, 'Stock quantity is required.').max(999999),
  wastage_quantity: z
    .number()
    .min(1, 'Wastage quantity is required.')
    .max(999999),
  alert_threshold: z
    .number()
    .min(1, 'Alert threshold is required.')
    .max(10000)
    .optional(),
});
