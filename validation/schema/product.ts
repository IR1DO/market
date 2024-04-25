import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255),
  price: z
    .number()
    .min(1, 'Price must be greater than or equal to 1.')
    .max(100000000),
  stock_quantity: z
    .number()
    .min(1, 'Stock quantity must be greater than or equal to 1.')
    .max(999999),
  wastage_quantity: z
    .number()
    .min(0, 'Wastage quantity must be greater than or equal to 0.')
    .max(999999)
    .optional(),
  alert_threshold: z
    .number()
    .min(0, 'Alert threshold must be greater than or equal to 0.')
    .max(10000)
    .optional(),
});

export const productPatchSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255).optional(),
  price: z
    .number()
    .min(1, 'Price must be greater than or equal to 1.')
    .max(100000000)
    .optional(),
  stock_quantity: z
    .number()
    .min(1, 'Stock quantity must be greater than or equal to 1.')
    .max(999999)
    .optional(),
  wastage_quantity: z
    .number()
    .min(0, 'Wastage quantity must be greater than or equal to 0.')
    .max(999999)
    .optional(),
  alert_threshold: z
    .number()
    .min(0, 'Alert threshold must be greater than or equal to 0.')
    .max(10000)
    .optional(),
});
