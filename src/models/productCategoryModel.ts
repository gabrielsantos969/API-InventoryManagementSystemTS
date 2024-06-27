import con from '../config/connect';

const addCategoryInProduct = async (id_product:number, categoryIds: number[]): Promise<void> => {

    const productCategoryValues = await categoryIds.map((categoryId:number) => [id_product, categoryId]);

    await con.promise().query("INSERT INTO product_category (id_product, id_category) VALUES ?", [productCategoryValues]);

}

export { addCategoryInProduct };