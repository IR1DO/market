import prisma from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';

type Product = {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const totalSaleAmount = body.reduce(
    (total: number, product: Product) => total + product.total_price,
    0
  );

  const newSale = await prisma.sale.create({
    data: {
      sale_amount: totalSaleAmount,
    },
  });

  for (const product of body) {
    await prisma.productsOfSales.create({
      data: {
        sale: {
          connect: { id: newSale.id },
        },
        product: {
          connect: { id: product.id },
        },
        product_name: product.name,
        product_price: product.unit_price,
        sale_quantity: product.quantity,
      },
    });

    // decrement product quantity
    await prisma.product.update({
      where: { id: product.id },
      data: {
        stock_quantity: {
          decrement: product.quantity,
        },
      },
    });
  }

  return NextResponse.json(newSale, { status: 201 });
}
