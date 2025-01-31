-- AlterTable
ALTER TABLE `User` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `password` VARCHAR(191) NULL;
