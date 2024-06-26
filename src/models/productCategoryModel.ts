import con from '../config/connect';

const addCategoryInProduct = async (id_product:number, id_category: any): Promise<void> => {

    await con.promise().query("INSERT INTO product_category (id_product, id_category) VALUES (?, ?)", [id_product, id_category]);

}

export { addCategoryInProduct };