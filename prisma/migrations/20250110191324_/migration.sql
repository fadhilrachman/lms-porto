-- DropForeignKey
ALTER TABLE `Chapter` DROP FOREIGN KEY `Chapter_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `Content` DROP FOREIGN KEY `Content_chapter_id_fkey`;

-- DropForeignKey
ALTER TABLE `ContentProgress` DROP FOREIGN KEY `ContentProgress_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `ContentProgress` DROP FOREIGN KEY `ContentProgress_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `ContentProgress` DROP FOREIGN KEY `ContentProgress_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_user_id_fkey`;

-- DropIndex
DROP INDEX `Chapter_course_id_key` ON `Chapter`;

-- DropIndex
DROP INDEX `Content_chapter_id_key` ON `Content`;

-- DropIndex
DROP INDEX `ContentProgress_content_id_key` ON `ContentProgress`;

-- DropIndex
DROP INDEX `ContentProgress_course_id_key` ON `ContentProgress`;

-- DropIndex
DROP INDEX `ContentProgress_user_id_key` ON `ContentProgress`;

-- DropIndex
DROP INDEX `Course_category_id_key` ON `Course`;

-- DropIndex
DROP INDEX `Transaction_course_id_key` ON `Transaction`;

-- DropIndex
DROP INDEX `Transaction_user_id_key` ON `Transaction`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `Chapter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentProgress` ADD CONSTRAINT `ContentProgress_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentProgress` ADD CONSTRAINT `ContentProgress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentProgress` ADD CONSTRAINT `ContentProgress_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `Content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
