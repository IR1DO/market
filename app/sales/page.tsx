import Pagination from '@/components/pagination';
import SalesTable from '@/components/sales-table';
import { buttonVariants } from '@/components/ui/button';
import prisma from '@/prisma/db';
import Link from 'next/link';
import React from 'react';

export interface SearchParams {
  page: string;
}

const Sales = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 6;
  const page = parseInt(searchParams.page) || 1;

  const saleCount = await prisma.sale.count();

  const sales = await prisma.sale.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div className='flex flex-col gap-4 px-6 py-4'>
      <div className='max-w-7xl w-full mx-auto mt-2'>
        <Link
          href='/sales/new'
          className={buttonVariants({ variant: 'default' })}
        >
          New Sale
        </Link>
      </div>

      <SalesTable sales={sales} />

      <Pagination
        itemCount={saleCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Sales;
