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
import { Sale } from '@prisma/client';
import DeleteBtn from './delete-btn';

const SalesTable = ({ sales }: { sales: Sale[] }) => {
  return (
    <div className='max-w-7xl w-full mx-auto mt-2'>
      <div className='rounded-md sm:border overflow-hidden'>
        <Table className='text-center'>
          <TableHeader>
            <TableRow className='bg-secondary hover:bg-secondary'>
              <TableHead className='text-left'>ID</TableHead>
              <TableHead className='text-center'>Total Amount</TableHead>
              <TableHead className='text-center'>Date</TableHead>
              <TableHead className='text-center'>Delete</TableHead>
              <TableHead className='text-center'>Edit</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sales ? (
              sales.map((sale) => (
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

                  <TableCell>
                    <DeleteBtn saleId={sale.id} />
                  </TableCell>

                  <TableCell>
                    <Link
                      href={`/sales/edit/${sale.id}`}
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

export default SalesTable;
