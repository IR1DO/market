/*
  Warnings:

  - A unique constraint covering the columns `[product_name]` on the table `products_of_sales` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_name` to the `products_of_sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products_of_sales" ADD COLUMN     "product_name" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_of_sales_product_name_key" ON "products_of_sales"("product_name");
