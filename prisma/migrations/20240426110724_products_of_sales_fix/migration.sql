/*
  Warnings:

  - Added the required column `sale_quantity` to the `products_of_sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products_of_sales` ADD COLUMN `sale_quantity` INTEGER NOT NULL;
