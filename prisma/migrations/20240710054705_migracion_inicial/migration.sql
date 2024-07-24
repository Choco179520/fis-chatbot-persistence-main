-- CreateTable
CREATE TABLE `Document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `utterances` JSON NOT NULL,
    `response_set_id` INTEGER NOT NULL,

    UNIQUE INDEX `Document_response_set_id_key`(`response_set_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResponseSet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `responses` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_response_set_id_fkey` FOREIGN KEY (`response_set_id`) REFERENCES `ResponseSet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
