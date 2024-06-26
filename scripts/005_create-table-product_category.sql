CREATE TABLE `inventory_manager_system`.`product_category`(
    `id_product` INT NOT NULL,
    `id_category` INT NOT NULL,
    PRIMARY KEY(`id_product`, `id_category`),
    CONSTRAINT `fk_id_product`
        FOREIGN KEY(`id_product`)
        REFERENCES `inventory_manager_system`.`product`(`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `fk_id_category`
        FOREIGN KEY(`id_category`)
        REFERENCES `inventory_manager_system`.`category`(`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);