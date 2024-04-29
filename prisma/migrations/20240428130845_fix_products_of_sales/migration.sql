/*
  Warnings:

  - Added the required column `product_price` to the `products_of_sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products_of_sales" ADD COLUMN     "product_price" DECIMAL(10,2) NOT NULL;
