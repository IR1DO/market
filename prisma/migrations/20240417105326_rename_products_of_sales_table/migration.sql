/*
  Warnings:

  - You are about to drop the `productsofsales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productsofsales` DROP FOREIGN KEY `ProductsOfSales_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `productsofsales` DROP FOREIGN KEY `ProductsOfSales_sale_id_fkey`;

-- DropTable
DROP TABLE `productsofsales`;

-- CreateTable
CREATE TABLE `products_of_sales` (
    `sale_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`sale_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products_of_sales` ADD CONSTRAINT `products_of_sales_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `Sale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_of_sales` ADD CONSTRAINT `products_of_sales_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
