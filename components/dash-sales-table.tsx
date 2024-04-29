'use client';

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
import { Sale } from '@prisma/client';
import { SearchParams } from '@/app/page';

interface Props {
  sales: Sale[];
  searchParams: SearchParams;
}

const DashSalesTable = ({ sales, searchParams }: Props) => {
  const [sort, setSort] = useState('');
  const [salesList, setSalesList] = useState<Sale[]>(sales);

  useEffect(() => {
    setSort(searchParams.sort);

    switch (sort) {
      case 'sale_id':
        sales.sort((a, b) => a.id - b.id);
        setSalesList([...sales]);
        break;

      case '-sale_id':
        sales.sort((a, b) => b.id - a.id);
        setSalesList([...sales]);
        break;

      case 'sale_amount':
        sales.sort(
          (a, b) =>
            parseFloat(a.sale_amount.toString()) -
            parseFloat(b.sale_amount.toString())
        );
        setSalesList([...sales]);
        break;

      case '-sale_amount':
        sales.sort(
          (a, b) =>
            parseFloat(b.sale_amount.toString()) -
            parseFloat(a.sale_amount.toString())
        );
        setSalesList([...sales]);
        break;

      case 'sale_date':
        sales.sort((a, b) => a.sale_date.getTime() - b.sale_date.getTime());
        setSalesList([...sales]);
        break;

      case '-sale_date':
        sales.sort((a, b) => b.sale_date.getTime() - a.sale_date.getTime());
        setSalesList([...sales]);
        break;

      default:
        break;
    }
  }, [sort, sales, searchParams]);

  return (
    <div className='rounded-md sm:border overflow-hidden z-0'>
      <Table className='text-center'>
        <TableHeader>
          <TableRow className='bg-secondary hover:bg-secondary'>
            <TableHead className='text-left'>
              <Link
                href={{
                  query: {
                    ...searchParams,
                    sort: `${
                      searchParams.sort === '-sale_id' ? 'sale_id' : '-sale_id'
                    }`,
                  },
                }}
              >
                <div className='flex items-center'>
                  Sale ID
                  {searchParams.sort === 'sale_id' && (
                    <ArrowUp className='inline p-1' />
                  )}
                  {searchParams.sort === '-sale_id' && (
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
                      searchParams.sort === '-sale_amount'
                        ? 'sale_amount'
                        : '-sale_amount'
                    }`,
                  },
                }}
              >
                <div className='flex items-center justify-center'>
                  Total Amount
                  {searchParams.sort === 'sale_amount' && (
                    <ArrowUp className='inline p-1' />
                  )}
                  {searchParams.sort === '-sale_amount' && (
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
                      searchParams.sort === '-sale_date'
                        ? 'sale_date'
                        : '-sale_date'
                    }`,
                  },
                }}
              >
                <div className='flex items-center justify-center'>
                  Date
                  {searchParams.sort === 'sale_date' && (
                    <ArrowUp className='inline p-1' />
                  )}
                  {searchParams.sort === '-sale_date' && (
                    <ArrowDown className='inline p-1' />
                  )}
                </div>
              </Link>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {salesList
            ? salesList.map((sale) => (
                <TableRow key={sale.id} data-href='/'>
                  <TableCell className='text-left'>
                    <Link
                      href={`/sales/${sale.id}`}
                      className='hover:underline hover:text-cyan-500'
                    >
                      {sale.id}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <div className='font-semibold text-orange-600'>{`¥${parseFloat(
                      sale.sale_amount.toString()
                    ).toLocaleString('en-us')}`}</div>
                  </TableCell>

                  <TableCell>
                    {sale.sale_date.toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashSalesTable;
