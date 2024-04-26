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
import DeleteLocalBtn from './delete-local-btn';

type Product = {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

interface Props {
  products?: Product[];
  onDelete: (productId: number) => void;
}

const SaleDetailTable = ({ products, onDelete }: Props) => {
  return (
    <div className='max-w-7xl w-full mx-auto mt-2'>
      <div className='rounded-md sm:border overflow-hidden'>
        <Table className='text-center'>
          <TableHeader>
            <TableRow className='bg-secondary hover:bg-secondary'>
              <TableHead className='text-left'>ID</TableHead>
              <TableHead className='text-left'>Name</TableHead>
              <TableHead className='text-center'>Quantity</TableHead>
              <TableHead className='text-center'>Unit Price</TableHead>
              <TableHead className='text-center'>Total Price</TableHead>
              <TableHead className='text-center'>Delete</TableHead>
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

                    <TableCell>
                      <DeleteLocalBtn
                        productId={product.id}
                        onDelete={onDelete}
                      />
                    </TableCell>
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
