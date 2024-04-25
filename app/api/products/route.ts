import prisma from '@/prisma/db';
import { productSchema } from '@/validation/schema/product';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = productSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }

  const duplicate = await prisma.product.findUnique({
    where: {
      name: body.name,
    },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: 'Duplicate username.' },
      { status: 409 }
    );
  }

  const newProduct = await prisma.product.create({ data: { ...body } });

  return NextResponse.json(newProduct, { status: 201 });
}
