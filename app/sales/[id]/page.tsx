import SaleDetailTable from '@/components/sale-detail-table';
import prisma from '@/prisma/db';
import { CircleX } from 'lucide-react';
import React from 'react';

interface Props {
  params: { id: string };
}

type Product = {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

const ViewSale = async ({ params }: Props) => {
  const sale = await prisma.sale.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!sale) {
    return (
      <div className='flex h-96'>
        <div className='text-destructive text-5xl flex flex-col justify-center items-center gap-4 mx-auto '>
          <CircleX className='w-12 h-12' />
          Sale Not Found
        </div>
      </div>
    );
  }

  const productsOfSales = await prisma.productsOfSales.findMany({
    where: { sale_id: sale.id },
  });

  const products = await Promise.all(
    productsOfSales.map(async (productOfSale) => {
      const product = await prisma.product.findUnique({
        where: { id: productOfSale.product_id },
      });
      return product;
    })
  );

  const convertedProducts: Product[] = products.map(
    (product: any, index: number) => {
      const { id, name, price } = product;
      const quantity = productsOfSales[index].sale_quantity;
      const unit_price = price;
      const total_price = quantity * unit_price;

      return { id, name, quantity, unit_price, total_price };
    }
  );

  return (
    <div className='flex flex-col gap-4 px-6 py-4'>
      <div className='flex felx-row justify-between items-center max-w-7xl w-full mx-auto mt-2'>
        <div className='flex flex-row gap-20'>
          <div className='text-lg font-semibold'>Sale ID: {sale.id}</div>
        </div>

        <div className='flex flex-row gap-20'>
          <div className='text-lg font-semibold'>
            <span>Total Amount:</span>
            <span className='text-orange-600'>{` ¥${parseInt(
              sale.sale_amount.toString()
            ).toLocaleString('en-US')}`}</span>
          </div>
          <div className='text-lg font-semibold'>
            Sale Date: {new Date(sale.sale_date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <SaleDetailTable products={convertedProducts} />
    </div>
  );
};

export default ViewSale;
