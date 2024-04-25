import ProductForm from '@/components/product-form';
import prisma from '@/prisma/db';
import { CircleX } from 'lucide-react';
import React from 'react';

interface Props {
  params: { id: string };
}

const EditProduct = async ({ params }: Props) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return (
      <div className='flex h-96'>
        <div className='text-destructive text-5xl flex flex-col justify-center items-center gap-4 mx-auto '>
          <CircleX className='w-12 h-12' />
          Product Not Found
        </div>
      </div>
    );
  }

  return (
    <div className='px-6 py-2'>
      <ProductForm product={product} />
    </div>
  );
};

export default EditProduct;
