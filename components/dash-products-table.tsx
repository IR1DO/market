import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Product } from '@prisma/client';

const DashProductsTable = ({ products }: { products: Product[] }) => {
  return (
    <div className='rounded-md sm:border overflow-hidden'>
      <Table className='text-center'>
        <TableHeader>
          <TableRow className='bg-secondary hover:bg-secondary'>
            <TableHead className='text-left'>ID</TableHead>
            <TableHead className='text-left'>Name</TableHead>
            <TableHead className='text-center'>Price</TableHead>
            <TableHead className='text-center'>Stock</TableHead>
            <TableHead className='text-center'>Wastage</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products
            ? products.map((product) => (
                <TableRow key={product.id} data-href='/'>
                  <TableCell className='text-left'>
                    <Link
                      href={`/products/edit/${product.id}`}
                      className='hover:underline hover:text-cyan-500'
                    >
                      {product.id}
                    </Link>
                  </TableCell>

                  <TableCell className='text-left'>
                    <Link
                      href={`/products/edit/${product.id}`}
                      className='hover:underline hover:text-cyan-500'
                    >
                      {product.name}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <div className='font-semibold text-orange-600'>{`¥${parseFloat(
                      product.price.toString()
                    ).toLocaleString('en-us')}`}</div>
                  </TableCell>

                  <TableCell>
                    <div className='flex justify-center'>
                      <div className=''>{product.stock_quantity}</div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className='flex justify-center'>
                      <div className=''>{product.wastage_quantity}</div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashProductsTable;
