/*
  Warnings:

  - You are about to drop the column `sales_amount` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `sales_date` on the `sale` table. All the data in the column will be lost.
  - Added the required column `sale_amount` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` DROP COLUMN `sales_amount`,
    DROP COLUMN `sales_date`,
    ADD COLUMN `sale_amount` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `sale_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
