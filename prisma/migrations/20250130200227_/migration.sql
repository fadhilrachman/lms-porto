/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `code` VARCHAR(191) NULL,
    ADD COLUMN `token_snap` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_code_key` ON `Transaction`(`code`);
