CREATE TABLE `inventory_manager_system`.`users` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` TEXT NOT NULL,
    `birthday` DATE,
    `sn_active` VARCHAR(1) NOT NULL DEFAULT 'N',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    UNIQUE INDEX `username_UNIQUE`(`username` ASC)VISIBLE,
    UNIQUE INDEX `email_UNIQUE`(`email`ASC)VISIBLE
);