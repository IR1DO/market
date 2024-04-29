import Pagination from '@/components/pagination';
import ProductsTable from '@/components/products-table';
import { buttonVariants } from '@/components/ui/button';
import prisma from '@/prisma/db';
import Link from 'next/link';
import React from 'react';

interface SearchParams {
  page: string;
}

const Products = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 6;
  const page = parseInt(searchParams.page) || 1;

  const productCount = await prisma.product.count();

  const products = await prisma.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div className='flex flex-col gap-4 px-6 py-4'>
      <div className='max-w-7xl w-full mx-auto mt-2'>
        <Link
          href='/products/new'
          className={buttonVariants({ variant: 'default' })}
        >
          New Product
        </Link>
      </div>

      <ProductsTable products={products} />

      <Pagination
        itemCount={productCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Products;
