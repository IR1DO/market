'use client';

import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { z } from 'zod';
import { saleSchema } from '@/validation/schema/sale';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import axios from 'axios';
import SaleDetailTable from './sale-detail-table';

type SaleFormData = z.infer<typeof saleSchema>;

type Product = {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

const SaleForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [isQtyGTStock, setIsQtyGTStock] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SaleFormData>({
    resolver: zodResolver(saleSchema),
  });

  // onSubmit handle the action of adding an item
  async function onSubmit(values: z.infer<typeof saleSchema>) {
    try {
      setError('');
      setSuccessMessage('');
      setIsSubmitting(true);

      const res = await axios.get(`/api/products/${productId}`);

      const data = res.data.product;

      const newProduct: Product = {
        id: data.id,
        name: data.name,
        quantity: values.quantity,
        unit_price: data.price,
        total_price: values.quantity * data.price,
      };

      const existingProductIndex = products.findIndex(
        (product) => product.id === newProduct.id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex].quantity += newProduct.quantity;
        updatedProducts[existingProductIndex].total_price +=
          newProduct.total_price;
        setProducts(updatedProducts);
      } else {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      }

      setSuccessMessage('Added item successfully.');
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

  // handleDelete handle the action of deleteing an item from the sale
  function handleDelete(productId: number) {
    try {
      setError('');
      setSuccessMessage('Removed item successfully.');

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      router.refresh();
    } catch (error) {
      const err = error as any;
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response.statusText;
      setError(`${error}. Error message: ${errorMessage}`);
    }
  }

  // handleSubmit handle the action of submitting the data of products
  async function handleSubmit() {
    try {
      setError('');
      setSuccessMessage('');
      setIsSubmitting(true);

      await axios.post('/api/sales', products);

      setSuccessMessage('Added sale successfully.');
      router.push('/sales');
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

  useEffect(() => {
    async function GetProduct() {
      try {
        const data = await axios.get(`/api/products/${productId}`);
        const product = data.data.product;
        setProductName(product.name);

        if (productQuantity) {
          setIsQtyGTStock(
            productQuantity > product.stock_quantity ? true : false
          );
        }
      } catch (error) {
        setProductName('No such item');
      }
    }

    if (productId) {
      GetProduct();
    }
  }, [productId, productQuantity]);

  return (
    <>
      <div className='max-w-7xl w-full mx-auto mt-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-row items-center justify-between'
          >
            <div className='flex flex-row gap-8 items-center'>
              <FormField
                name='id'
                control={form.control}
                defaultValue={undefined}
                render={({ field }) => (
                  <FormItem className='flex flex-row gap-4 justify-center items-center space-y-0'>
                    <FormLabel className='grow'>ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Product ID...'
                        type='number'
                        {...field}
                        onChange={(event) => {
                          field.onChange(Number(event.target.value));
                          setProductId(event.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name='quantity'
                control={form.control}
                defaultValue={undefined}
                render={({ field }) => (
                  <FormItem className='flex flex-row gap-4 justify-center items-center space-y-0'>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Quantity...'
                        type='number'
                        {...field}
                        onChange={(event) => {
                          field.onChange(Number(event.target.value));
                          setProductQuantity(event.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-row gap-4 items-center'>
              <div
                className={
                  productName !== 'No such item'
                    ? 'text-green-500'
                    : 'text-destructive'
                }
              >
                {productName}
              </div>
              <div
                className={isQtyGTStock ? 'text-destructive' : 'text-green-500'}
              >
                {productName !== 'No such item'
                  ? isQtyGTStock
                    ? 'Exceed'
                    : productName && parseInt(productQuantity) > 0
                    ? `x${productQuantity}`
                    : ''
                  : ''}
              </div>
              <Button
                type='submit'
                disabled={
                  productName === 'No such item' ||
                  productName === '' ||
                  isQtyGTStock ||
                  isSubmitting
                }
              >
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <SaleDetailTable products={products} onDelete={handleDelete} />

      <div className='max-w-7xl w-full mx-auto mt-2'>
        {`Total Amount: ¥${products
          .reduce((total, product) => total + product.total_price, 0)
          .toLocaleString('en-US')}`}
      </div>

      <div className='max-w-7xl w-full mx-auto mt-2'>
        <div className='flex gap-4'>
          <Button
            onClick={handleSubmit}
            disabled={products.length === 0 || isSubmitting}
          >
            Add
          </Button>
          <Button onClick={() => router.push('/sales')}>Cancel</Button>
        </div>
      </div>
    </>
  );
};

export default SaleForm;
