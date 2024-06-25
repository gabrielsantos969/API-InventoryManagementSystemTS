ALTER TABLE `inventory_manager_system`.`product` 
ADD UNIQUE INDEX `cd_product_UNIQUE` (`cd_product` ASC) VISIBLE,
ADD UNIQUE INDEX `sku_UNIQUE` (`sku` ASC) VISIBLE;
;

ALTER TABLE `inventory_manager_system`.`status` 
ADD UNIQUE INDEX `nm_status_UNIQUE` (`nm_status` ASC) VISIBLE;
;
