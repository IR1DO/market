import prisma from '@/prisma/db';
import { faker } from '@faker-js/faker';
import { UniqueEnforcer } from 'enforce-unique';

async function main() {
  const uniqueEnforcer = new UniqueEnforcer();

  await prisma.$executeRaw`truncate "Product", "Sale", products_of_sales RESTART IDENTITY;`;

  for (let i = 0; i < 50; i++) {
    const name = faker.commerce.product();

    try {
      uniqueEnforcer.enforce(name);
    } catch (error) {
      continue;
    }

    const price = faker.commerce.price({ min: 1, max: 300 });
    const stockQuantity = faker.number.int({ min: 1, max: 1000 });
    const wastageQuantity = faker.number.int({ max: stockQuantity });

    await prisma.product.create({
      data: {
        name,
        price,
        stock_quantity: stockQuantity,
        wastage_quantity: wastageQuantity,
      },
    });
  }

  console.log('Seed script executed successfully.');
}

main();
