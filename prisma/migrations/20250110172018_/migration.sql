-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `price` INTEGER NULL,
    `is_free` BOOLEAN NOT NULL DEFAULT false,
    `is_published` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(191) NOT NULL,
    `introduction_vid` VARCHAR(191) NOT NULL,
    `thumbnail_img` VARCHAR(191) NOT NULL,
    `resource` VARCHAR(191) NOT NULL,
    `is_finish` BOOLEAN NOT NULL DEFAULT false,
    `category_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Course_category_id_key`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapter` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `course_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Chapter_course_id_key`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `content_vid` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `is_finish` BOOLEAN NOT NULL DEFAULT false,
    `chapter_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Content_chapter_id_key`(`chapter_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `course_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Transaction_course_id_key`(`course_id`),
    UNIQUE INDEX `Transaction_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentProgress` (
    `id` VARCHAR(191) NOT NULL,
    `course_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `content_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ContentProgress_course_id_key`(`course_id`),
    UNIQUE INDEX `ContentProgress_user_id_key`(`user_id`),
    UNIQUE INDEX `ContentProgress_content_id_key`(`content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
