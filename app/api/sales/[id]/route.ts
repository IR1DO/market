import prisma from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const productsOfSales = await prisma.productsOfSales.findMany({
    where: { sale_id: parseInt(params.id) },
  });

  if (productsOfSales.length === 0) {
    return NextResponse.json(
      { error: 'Product of sale not found.' },
      { status: 404 }
    );
  }

  await Promise.all(
    productsOfSales.map(async (productOfSale) => {
      await prisma.productsOfSales.delete({
        where: {
          sale_id_product_id: {
            sale_id: productOfSale.sale_id,
            product_id: productOfSale.product_id,
          },
        },
      });

      // restore product quantity
      const product = await prisma.product.findUnique({
        where: { id: productOfSale.product_id },
      });

      if (product) {
        const updatedStockQuantity =
          product.stock_quantity + productOfSale.sale_quantity;
        await prisma.product.update({
          where: { id: productOfSale.product_id },
          data: { stock_quantity: updatedStockQuantity },
        });
      }
    })
  );

  const sale = await prisma.sale.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!sale) {
    return NextResponse.json({ error: 'Sale not found.' }, { status: 404 });
  }

  await prisma.sale.delete({
    where: { id: sale.id },
  });

  return NextResponse.json({
    message: 'Sale and related ProductsOfSales deleted successfully.',
  });
}
