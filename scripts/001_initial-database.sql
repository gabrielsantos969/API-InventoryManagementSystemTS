CREATE DATABASE `inventory_manager_system` ;

CREATE TABLE `inventory_manager_system`.`status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nm_status` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

CREATE TABLE `inventory_manager_system`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nm_product` VARCHAR(45) NOT NULL,
  `cd_product` VARCHAR(255) NOT NULL,
  `status` INT NULL DEFAULT NULL,
  `sku` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `fk_status_product_idx` (`status` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_status_product`
    FOREIGN KEY (`status`)
    REFERENCES `inventory_manager_system`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO `inventory_manager_system`.`status` (`nm_status`) VALUES ('IN STOCK');
INSERT INTO `inventory_manager_system`.`status` (`nm_status`) VALUES ('LACKING');
INSERT INTO `inventory_manager_system`.`status` (`nm_status`) VALUES ('LOW STOCK');
INSERT INTO `inventory_manager_system`.`status` (`nm_status`) VALUES ('WAITING FOR DELIVERY');
