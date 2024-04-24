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
import { ShieldAlert, ShieldCheck } from 'lucide-react';

const ProductsTable = ({ products }: { products: Product[] }) => {
  return (
    <div className='max-w-7xl w-full mx-auto mt-2'>
      <div className='rounded-md sm:border overflow-hidden'>
        <Table className='text-center'>
          <TableHeader>
            <TableRow className='bg-secondary hover:bg-secondary'>
              <TableHead className='text-left'>ID</TableHead>
              <TableHead className='text-left'>Name</TableHead>
              <TableHead className='text-center'>Price</TableHead>
              <TableHead className='text-center'>Stock</TableHead>
              <TableHead className='text-center'>Wastage</TableHead>
              <TableHead className='text-center'>Alert</TableHead>
              <TableHead className='text-center'>Added At</TableHead>
              <TableHead className='text-center'>Delete</TableHead>
              <TableHead className='text-center'>Edit</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products ? (
              products.map((product) => (
                <TableRow key={product.id} data-href='/'>
                  <TableCell className='text-left'>
                    <Link
                      href={`/products/${product.id}`}
                      className='hover:underline hover:text-cyan-500'
                    >
                      {product.id}
                    </Link>
                  </TableCell>

                  <TableCell className='text-left'>
                    <Link
                      href={`/products/${product.id}`}
                      className='hover:underline hover:text-cyan-500'
                    >
                      {product.name}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <div className='font-semibold text-orange-600'>{`¥${product.price.toString()}`}</div>
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

                  <TableCell>
                    <div className='flex justify-center'>
                      <div className=''>
                        {product.stock_quantity - product.wastage_quantity <
                        product.alert_threshold ? (
                          <ShieldAlert className='text-red-500' />
                        ) : (
                          <ShieldCheck className='text-green-500' />
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {product.created_at.toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </TableCell>

                  <TableCell>
                    <Link
                      href={`/products/edit/${product.id}`}
                      className='text-red-500 hover:underline'
                    >
                      {/* TODO */}
                      Delete
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Link
                      href={`/products/edit/${product.id}`}
                      className='text-teal-500 hover:underline'
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div></div>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsTable;
