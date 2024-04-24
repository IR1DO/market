/*
  Warnings:

  - You are about to drop the column `sales_quantity` on the `sale` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `products_of_sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products_of_sales` ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `sales_quantity`;

-- CreateIndex
CREATE UNIQUE INDEX `Product_name_key` ON `Product`(`name`);
