'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';

type Product = {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

interface Props {
  products?: Product[];
  onDelete?: (productId: number) => void;
}

const SaleDetailTable = ({ products, onDelete }: Props) => {
  return (
    <div className='max-w-7xl w-full mx-auto mt-2'>
      <div className='rounded-md sm:border overflow-hidden'>
        <Table className='text-center'>
          <TableHeader>
            <TableRow className='bg-secondary hover:bg-secondary'>
              <TableHead className='text-left'>Product ID</TableHead>
              <TableHead className='text-left'>Name</TableHead>
              <TableHead className='text-center'>Quantity</TableHead>
              <TableHead className='text-center'>Unit Price</TableHead>
              <TableHead className='text-center'>Total Price</TableHead>
              {onDelete ? (
                <TableHead className='text-center'>Delete</TableHead>
              ) : null}
            </TableRow>
          </TableHeader>

          <TableBody>
            {products
              ? products.map((product) => (
                  <TableRow key={product.id} data-href='/'>
                    <TableCell className='text-left'>{product.id}</TableCell>

                    <TableCell className='text-left'>{product.name}</TableCell>

                    <TableCell>
                      <div className='flex justify-center'>
                        <div className=''>{product.quantity}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className='font-semibold text-orange-600'>{`¥${parseFloat(
                        product.unit_price.toString()
                      ).toLocaleString('en-us')}`}</div>
                    </TableCell>

                    <TableCell>
                      <div className='font-semibold text-orange-600'>{`¥${parseFloat(
                        product.total_price.toString()
                      ).toLocaleString('en-us')}`}</div>
                    </TableCell>

                    {onDelete ? (
                      <TableCell>
                        <Button
                          variant='link'
                          className='text-red-500 hover:underline'
                          onClick={() => onDelete(product.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SaleDetailTable;
