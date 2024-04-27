import prisma from '@/prisma/db';
import { productSchema } from '@/validation/schema/product';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = productSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  const updateProduct = await prisma.product.update({
    where: { id: product.id },
    data: { ...body },
  });

  return NextResponse.json(updateProduct);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  await prisma.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json({ message: 'Product deleted.' });
}

export async function GET(request: NextRequest, { params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  return NextResponse.json({ product });
}
