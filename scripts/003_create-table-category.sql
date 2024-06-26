CREATE TABLE `inventory_manager_system`.`category` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nm_category` VARCHAR(45) NOT NULL,
    `sn_active` VARCHAR(1) NOT NULL DEFAULT 'N',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    UNIQUE INDEX `nm_category_UNIQUE`(`nm_category` ASC) VISIBLE
);