'use client';

import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import { productSchema } from '@/validation/schema/product';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';

type ProductFormData = z.infer<typeof productSchema>;

interface Props {
  product?: Product;
}

const ProductForm = ({ product }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    try {
      setError('');
      setIsSubmitting(true);

      if (product) {
        await axios.patch('/api/products/' + product.id, values);
      } else {
        await axios.post('/api/products', values);
      }

      setSuccessMessage(
        'The product information has been updated successfully.'
      );
      // TODO: route to the previous page with page params
      router.push('/products');
      router.refresh();
      setIsSubmitting(false);
    } catch (error) {
      const err = error as any;
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response.statusText;
      setError(`${error}. Error message: ${errorMessage}`);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        description: error,
      });
    } else if (successMessage) {
      toast({
        description: successMessage,
      });
    }
  }, [error, successMessage, toast]);

  return (
    <div className='rounded-md border w-full p-4 max-w-7xl mx-auto mt-2 sm:mt-0'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            name='name'
            control={form.control}
            defaultValue={product?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder='Product Name...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='price'
            control={form.control}
            defaultValue={product ? Number(product.price) : undefined}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Price...'
                    type='number'
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='stock_quantity'
            control={form.control}
            defaultValue={product?.stock_quantity}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Stock...'
                    type='number'
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='wastage_quantity'
            control={form.control}
            defaultValue={product?.wastage_quantity}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wastage</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Wastage...'
                    type='number'
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='alert_threshold'
            control={form.control}
            defaultValue={product?.alert_threshold}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Threshold</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Alert Threshold...'
                    type='number'
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isSubmitting}>
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
