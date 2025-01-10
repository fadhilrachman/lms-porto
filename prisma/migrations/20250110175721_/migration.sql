-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_category_id_fkey`;

-- AlterTable
ALTER TABLE `Course` MODIFY `category_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
