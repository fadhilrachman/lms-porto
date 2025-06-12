-- DropForeignKey
ALTER TABLE `Chapter` DROP FOREIGN KEY `Chapter_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `Content` DROP FOREIGN KEY `Content_chapter_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_course_id_fkey`;

-- DropIndex
DROP INDEX `Chapter_course_id_fkey` ON `Chapter`;

-- DropIndex
DROP INDEX `Content_chapter_id_fkey` ON `Content`;

-- DropIndex
DROP INDEX `Transaction_course_id_fkey` ON `Transaction`;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `Chapter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
