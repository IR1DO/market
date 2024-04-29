'use client';

import { ProductSalesAndAmounts, SearchParams } from '@/app/page';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface Props {
  products: ProductSalesAndAmounts[];
  searchParams: SearchParams;
}

const DashProductSalesTable = ({ products, searchParams }: Props) => {
  const [sort, setSort] = useState('');
  const [productsList, setProductsList] =
    useState<ProductSalesAndAmounts[]>(products);

  useEffect(() => {
    setSort(searchParams.sort);

    switch (sort) {
      case 'product_id':
        products.sort((a, b) => a.id - b.id);
        setProductsList([...products]);
        break;

      case '-product_id':
        products.sort((a, b) => b.id - a.id);
        setProductsList([...products]);
        break;

      case 'product_name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        setProductsList([...products]);
        break;

      case '-product_name':
        products.sort((a, b) => b.name.localeCompare(a.name));
        setProductsList([...products]);
        break;

      case 'product_quantity':
        products.sort((a, b) => a.quantity - b.quantity);
        setProductsList([...products]);
        break;

      case '-product_quantity':
        products.sort((a, b) => b.quantity - a.quantity);
        setProductsList([...products]);
        break;

      case 'product_amount':
        products.sort((a, b) => a.amount - b.amount);
        setProductsList([...products]);
        break;

      case '-product_amount':
        products.sort((a, b) => b.amount - a.amount);
        setProductsList([...products]);
        break;

      default:
        break;
    }
  }, [sort, products, searchParams]);

  return (
    <Table className='text-center'>
      <TableHeader>
        <TableRow className='bg-secondary hover:bg-secondary'>
          <TableHead className='text-left'>
            <Link
              href={{
                query: {
                  ...searchParams,
                  sort: `${
                    searchParams.sort === '-product_id'
                      ? 'product_id'
                      : '-product_id'
                  }`,
                },
              }}
            >
              <div className='flex items-center'>
                Product ID
                {searchParams.sort === 'product_id' && (
                  <ArrowUp className='inline p-1' />
                )}
                {searchParams.sort === '-product_id' && (
                  <ArrowDown className='inline p-1' />
                )}
              </div>
            </Link>
          </TableHead>

          <TableHead className='text-left'>
            <Link
              href={{
                query: {
                  ...searchParams,
                  sort: `${
                    searchParams.sort === '-product_name'
                      ? 'product_name'
                      : '-product_name'
                  }`,
                },
              }}
            >
              <div className='flex items-center'>
                Name
                {searchParams.sort === 'product_name' && (
                  <ArrowUp className='inline p-1' />
                )}
                {searchParams.sort === '-product_name' && (
                  <ArrowDown className='inline p-1' />
                )}
              </div>
            </Link>
          </TableHead>

          <TableHead className='text-center'>
            <Link
              href={{
                query: {
                  ...searchParams,
                  sort: `${
                    searchParams.sort === '-product_quantity'
                      ? 'product_quantity'
                      : '-product_quantity'
                  }`,
                },
              }}
            >
              <div className='flex items-center justify-center'>
                Quantity Sold
                {searchParams.sort === 'product_quantity' && (
                  <ArrowUp className='inline p-1' />
                )}
                {searchParams.sort === '-product_quantity' && (
                  <ArrowDown className='inline p-1' />
                )}
              </div>
            </Link>
          </TableHead>
          <TableHead className='text-center'>
            <Link
              href={{
                query: {
                  ...searchParams,
                  sort: `${
                    searchParams.sort === '-product_amount'
                      ? 'product_amount'
                      : '-product_amount'
                  }`,
                },
              }}
            >
              <div className='flex items-center justify-center'>
                Amount Sold
                {searchParams.sort === 'product_amount' && (
                  <ArrowUp className='inline p-1' />
                )}
                {searchParams.sort === '-product_amount' && (
                  <ArrowDown className='inline p-1' />
                )}
              </div>
            </Link>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {productsList
          ? productsList.map((product) => (
              <TableRow key={product.id} data-href='/'>
                <TableCell className='text-left'>{product.id}</TableCell>

                <TableCell className='text-left'>{product.name}</TableCell>

                <TableCell>{product.quantity}</TableCell>

                <TableCell>
                  <div className='font-semibold text-orange-600'>{`¥${parseFloat(
                    product.amount.toString()
                  ).toLocaleString('en-us')}`}</div>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};

export default DashProductSalesTable;
