import { z } from 'zod';

export const saleSchema = z.object({
  id: z.number().min(1, 'Id must be valid.').max(65535),
  quantity: z
    .number()
    .min(1, 'Quantity must be greater than or equal to 1.')
    .max(999999),
});
